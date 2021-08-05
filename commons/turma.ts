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
      var turma: Turma = new Turma();
      turma.copyFrom(this);
      return turma;
    }
  
    copyFrom(from: Turma): void {
      this.nome = from.nome;
      this.descricao = from.descricao;
      this.id = from.id;
      this.alunoLista.copyCadastroAlunosFrom(from.alunoLista);
    }

  }