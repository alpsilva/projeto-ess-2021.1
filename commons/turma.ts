import { Aluno } from "./aluno";

export class Turma {
    nome: string;
    descricao: string;
    id: number;
    alunoLista: Array<Aluno>;
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.nome = "";
      this.descricao = "";
      this.id = -1;
      this.alunoLista = new Array<Aluno>();
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
      this.copyAlunoListaFrom(from.alunoLista);
    }
  
    copyAlunoListaFrom(from: Array<Aluno>): void {
      this.alunoLista = new Array<Aluno>();
      for (let i = 0; i < from.length; i++) {
        this.alunoLista[i] = from[i];
      }
    }
  }