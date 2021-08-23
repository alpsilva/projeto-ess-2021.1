import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Turma } from '../../../../commons/turma';
import { Aluno } from '../../../../commons/aluno';

@Injectable()
export class TurmaService {
  turmas: Turma[] = [];
  idLivre: number = 1;
  accessId: number = -1;

  private headers = new HttpHeaders({'Content-Type':'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(turma: Turma): Observable<Turma> {
    turma = turma.clone();
    var result = null;

    turma.id = this.idLivre;
    this.idLivre = this.idLivre + 1;
    this.turmas.push(turma);

    result = turma;
    return this.http.post<any>(this.taURL + "/turma", turma, {headers: this.headers})
            .pipe(
              retry(2),
              map( res => {
                if (res.success) {
                  return turma;
                } else {
                  return null;
                }
              })
            );
  }

  atualizar(turma: Turma): Observable<Turma> {
    turma = turma.clone();
    return this.http.put<any>(this.taURL + "/turma",JSON.stringify(turma), {headers: this.headers}).pipe( 
      retry(2),
      map( res => {if (res.success) {return turma;} else {return null;}} )
    );
  }

  atualizarAlunos(id: number, newAlunos: Array<Aluno>): Observable<Array<Aluno>> {
    return this.http.put<any>(this.taURL + "/turma/" + id + "/alunos",JSON.stringify(newAlunos), {headers: this.headers}).pipe( 
      retry(2),
      map( res => {if (res.success) {return newAlunos;} else {return null;}} )
    );
  }

  insertAluno(id: number, newAluno: Aluno): Observable<Aluno> {
    var metas: [string, string][] = [];
    for (let m of newAluno.metas){
      var chave: string = m[0];
      var val: string = m[1];
      metas.push([chave, val]);
    }
    var mergedObj = {newAluno, metas};
    return this.http.put<any>(this.taURL + "/turma/" + id + "/aluno",JSON.stringify(mergedObj), {headers: this.headers}).pipe( 
      retry(2),
      map( res => {if (res.success) {return newAluno;} else {return null;}} )
    );
  }

  deleteAluno(id: number, delAluno: Aluno): Observable<Aluno> {
    return this.http.put<any>(this.taURL + "/turma/" + id + "/" + delAluno.cpf + "/aluno", {headers: this.headers}).pipe( 
      retry(2),
      map( res => {if (res.success) { return delAluno; } else {return null;}} )
    );
  }

  atualizarListaMetas(id: number, newMetas: Array<string>): Observable<Array<string>> {
    return this.http.put<any>(this.taURL + "/turma/" + id + "/metas",JSON.stringify(newMetas), {headers: this.headers}).pipe( 
      retry(2),
      map( res => {if (res.success) {return newMetas;} else {return null;}} )
    );
  }

  atualizarMetasUmAluno(id: number, cpf: string, metas: Map<string, string>): Observable<Map<string, string>> {
    var request: [string, string][] = [];
    for (let m of metas) {
      var chave: string = m[0];
      var val: string = m[1];
      request.push([chave, val]);
    }

    return this.http.put<any>(this.taURL + "/turma/" + id + "/metas/" + cpf,JSON.stringify(request), {headers: this.headers}).pipe( 
      retry(2),
      map( res => {if (res.success) {return metas;} else {return null;}} )
    );
  }

  deletar(id: number): Observable<number> {
    return this.http.delete<any>(this.taURL + "/turma/" + id, {headers: this.headers})
    .pipe(
      retry(2),
      map( res => {if (res.success) {return id;} else {return null;}} )
    );
  }

  getOnlyTurma(id: number): Observable <Turma> {
    return this.http.get<Turma>(this.taURL + "/turma/" + id)
              .pipe(
                retry(2)
              );
  }

  getTurmas(): Observable <Turma[]> {
    return this.http.get<Turma[]>(this.taURL + "/turmas")
              .pipe(
                retry(2)
              );
  }

  updateTurmas(): void {
    this.getTurmas().subscribe(
      list => {
        var nl: Turma[] = [];
        for (let t of list) {
          nl.push(t);
          if (this.turmas.length == 0) {
            this.turmas.push(t);
          }
        }
      },
      msg => {console.log(msg.message);}
    );
  }

  updateAccessId(newAccessId: number): void {
    this.accessId = newAccessId;
  }

  getAcessId(): number {
    var result: number;
    var urlAtual: string = window.location.href;
    urlAtual = urlAtual.substring(urlAtual.indexOf("/teacher"));
    if (urlAtual.includes("/teacher/turmas/classe/")) {
      if (this.accessId != parseInt(urlAtual.substring(urlAtual.indexOf("classe/") + 7))) {
        this.accessId = parseInt(urlAtual.substring(urlAtual.indexOf("classe/") + 7));
      }
    }
    result = this.accessId;
    return result;
  }

  getMetasOf(id: number, aluno: Aluno): Observable <[string,string][]> {
    return this.http.get<[string,string][]>(this.taURL + "/turma/" + id + "/metas/" + aluno.cpf).pipe(
      retry(2)
    );
  }

  updateIdLivre(){
    this.getIdLivre().subscribe(
      il => {
        var ilNum = parseInt(il);
        this.idLivre = ilNum;
      },
      msg => {console.log(msg.message);}
    );
  }

  getIdLivre(){
    return this.http.get<string>(this.taURL + "/turma/idlivre", {headers: this.headers})
    .pipe(
      retry(2)
    );
  }
}