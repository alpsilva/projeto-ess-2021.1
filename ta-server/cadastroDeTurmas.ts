import { Turma } from '../commons/turma';

export class CadastroDeTurmas{
    turmas: Turma[] = [];
    idLivre: number = 1;

    criar(turma: Turma): Turma {
        turma = turma.clone();
        var result = null;

        turma.id = this.idLivre;
        this.idLivre = this.idLivre + 1;
        this.turmas.push(turma);

        result = turma;
        return result;
    }

    atualizar(turma: Turma): Turma {
        turma = turma.clone();
        var result = null;
        for (let t of this.turmas) {
            if (t.id == turma.id) {
                t.nome = turma.nome;
                t.descricao = turma.descricao;
                t.alunoLista = turma.alunoLista;

                result = t;
            }
        }
        return result;
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
        var result = null;

        for (let i = 0; i < this.turmas.length; i++){
            if (this.turmas[i].id == id){
                result = this.turmas[i].clone();
            }
        }

        return result;
    }

    getTurmas(): Turma[] {
        var result: Turma[] = [];
        for (let t of this.turmas) {
        result.push(t.clone());
        }
        return result;
    }

}