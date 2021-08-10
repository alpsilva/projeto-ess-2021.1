import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private params = new HttpParams();
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
                  console.log(res.success);
                  return turma;
                } else {
                  console.error(res.failure);
                  return null;
                }
              })
            );
  }

  atualizar(turma: Turma): Observable<Turma> {
    turma = turma.clone();
    console.log(turma.getAlunos());
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

  atualizarMetas(id: number, newMetas: Array<string>): Observable<Array<string>> {
    return this.http.put<any>(this.taURL + "/turma/" + id + "/metas",JSON.stringify(newMetas), {headers: this.headers}).pipe( 
      retry(2),
      map( res => {if (res.success) {return newMetas;} else {return null;}} )
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

  updateAccessId(newAccessId: number): void {
    console.log("updateAccessId(" + newAccessId + ")");
    this.accessId = newAccessId;
    console.log("End of: updateAccessId(" + newAccessId + ")");
  }

  getAcessId(): number {
    var result: number;
    result = this.accessId;
    console.log("AccessId: ", result);
    return result;
  }
}