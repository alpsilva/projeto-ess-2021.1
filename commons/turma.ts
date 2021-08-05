import { Aluno } from "./aluno";
import { CadastroAlunos } from "./cadastroAlunos";

export class Turma {
    nome: string;
    descricao: string;
    id: number;
    alunoLista: CadastroAlunos;
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.nome = "";
      this.descricao = "";
      this.id = -1;
      this.alunoLista = new CadastroAlunos();
    }
  
    clone(): Turma {
      console.log("clone()");
      var turma: Turma = new Turma();
      turma.copyFrom(this);
      console.log("End of: clone()");
      return turma;
    }
  
    copyFrom(from: Turma): void {
      console.log("copyFrom(" + from.toString() + ")");
      this.nome = from.nome;
      this.descricao = from.descricao;
      this.id = from.id;
      this.alunoLista.copyCadastroAlunosFrom(from.alunoLista);
      console.log("End of: copyFrom(" + from.toString() + ")");
    }

    toString(): string {
      var result: string = "[";
      result = result + "nome: " + this.nome + ", ";
      result = result + "id: " + this.id + "]";
      return result;
    }
  }