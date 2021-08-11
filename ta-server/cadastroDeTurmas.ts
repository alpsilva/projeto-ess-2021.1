import { Turma } from '../commons/turma';
import { Aluno } from '../commons/aluno';

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
            console.log("Searching id: " + t.id);
            console.log("turma.id = " + turma.id);
            if (t.id == turma.id) {
                console.log("Match on: " + t.id);
                t.nome = turma.nome;
                t.descricao = turma.descricao;
                console.log(turma.alunoLista.getAlunos()[0]);
                t.alunoLista.copyCadastroAlunosFrom(turma.alunoLista);
                for (let i = 0; i < turma.metasLista.length; i++) {
                    t.metasLista[i] = turma.metasLista[i];
                }
                result = t;
            }
        }
        return result;
    }

    inserirAluno(id: number, newAluno: Aluno): Aluno{
        var index = this.findIndexById(id);
        return this.turmas[index].insertAluno(newAluno);     
    }

    deletarAluno(id: number, delCpf: string): Aluno{
        var index = this.findIndexById(id);
        return this.turmas[index].deleteAluno(delCpf);     
    }

    atualizarAlunos(id: number, newAlunos: Array<Aluno>): Turma {
        var index = this.findIndexById(id);
        this.turmas[index].cleanAlunos();
        this.turmas[index].insertManyAlunos(newAlunos);
        return this.turmas[index];
    }

    atualizarAluno(id: number, aluno: Aluno): Turma {
        var index = this.findIndexById(id);
        this.turmas[index].updateAluno(aluno);
        return this.turmas[index];
    }

    atualizarMetas(id: number, metas: Array<string>): Turma {
        var index = this.findIndexById(id);
        this.turmas[index].cleanMetas();
        this.turmas[index].insertManyMetas(metas);
        return this.turmas[index];
    }

    atualizarMetasUmAluno(id: number, cpf: string, metas: Map<string, string>): Turma {
        var index = this.findIndexById(id);
        for (let i = 0; i < this.turmas[index].alunoLista.alunos.length; i++){
            if (this.turmas[index].alunoLista.alunos[i].cpf == cpf){
                this.turmas[index].alunoLista.alunos[i].metas = new Map<string, string>(metas);
            }
        }
        return this.turmas[index];
    }

    findIndexById(id: number): number {
        for (let i = 0; i < this.turmas.length; i++){
            if (this.turmas[i].id == id){
                return i;
            }
        }
        return -1;
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