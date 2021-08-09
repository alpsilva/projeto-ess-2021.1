import { Injectable } from '@angular/core';

import { Turma } from '../../../../commons/turma';

@Injectable()
export class TurmaService {
  turmas: Turma[] = [];
  idLivre: number = 1;
  accessId: number = -1;


  criar(turma: Turma): Turma {
    turma = turma.clone();
    var result = null;

    turma.id = this.idLivre;
    this.idLivre = this.idLivre + 1;
    this.turmas.push(turma);

    result = turma;
    return result;
  }
  //adicionar inserção de metas
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

  getTurmas(): Turma[] {
    var result: Turma[] = [];
    for (let t of this.turmas) {
      result.push(t.clone());
    }
    return result;
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