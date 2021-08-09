import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Turma } from '../../../../commons/turma';

@Injectable()
export class TurmaService {
  turmas: Turma[] = [];
  idLivre: number = 1;
  accessId: number = -1;

  private headers = new HttpHeaders({'Content-Type':'application/json'});
  private params = new HttpParams();
  private taURL = 'http://192.168.0.105:3000';

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

  //adicionar inserção de metas
  adicionarMeta(turma: Turma, meta: string): Turma {
    turma = turma.clone();
    var metaExists: boolean = false;
    var result = null;
    for (let key in turma.getMetas) {
      if (meta == key) {
        metaExists = true;
      }
    }
    if (!metaExists) {
      turma.insertMeta(meta);
    }
    result = turma;
    return result;
  }

  atualizar(turma: Turma): void {
    turma = turma.clone();
    for (let t of this.turmas) {
        if (t.id == turma.id) {
            t.nome = turma.nome;
            t.descricao = turma.descricao;
            t.alunoLista = turma.alunoLista;
            t.metasLista = turma.metasLista;
        }
    }
  }

  deletar(id: number): Turma {
    var result = null;

    for (let i = 0; i < this.turmas.length; i++){
        if (this.turmas[i].id == id){
            result = this.turmas[i].clone();
            this.turmas.splice(i, 1);
        }
    }  

    return result;
  }

  getOnlyTurma(id: number): Turma {
    console.log("getOnlyTurma(" + id + ")");
    var result = null;

    for (let i = 0; i < this.turmas.length; i++){
        if (this.turmas[i].id == id){
            result = this.turmas[i].clone();
        }
    }
    console.log("End of: getOnlyTurma(" + id + ")");

    return result;
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
    console.log("getAccessId()");
    var result: number;
    result = this.accessId;
    console.log("End of: getAccessId()");
    return result;
  }
}