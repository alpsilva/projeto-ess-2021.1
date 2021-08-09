import { Aluno } from "./aluno";
import { CadastroAlunos } from "./cadastroAlunos";

export class Turma {
    nome: string;
    descricao: string;
    id: number;
    alunoLista: CadastroAlunos;
    metasLista: Array<string>;
    
    constructor() {
      this.clean();
    }

    clean(): void {
      this.nome = "";
      this.descricao = "";
      this.id = -1;
      this.alunoLista = new CadastroAlunos();
      this.metasLista = new Array<string>();
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
      for (let i = 0; i < from.metasLista.length; i++) {
        this.metasLista[i] = from.metasLista[i];
      }
      console.log("End of: copyFrom(" + from.toString() + ")");
    }

    insertAluno(a: Aluno): Aluno{
      return this.alunoLista.criar(a);
    }

    getAlunos(): Aluno[]{
      return this.alunoLista.getAlunos();
    }

    updateAluno(a: Aluno): void{
      this.alunoLista.atualizar(a);
    }

    deleteAluno(cpf: string): Aluno{
      return this.alunoLista.deletar(cpf);
    }

    toString(): string {
      var result: string = "[";
      result = result + "nome: " + this.nome + ", ";
      result = result + "id: " + this.id + "]";
      return result;
    }
    insertMeta(meta: string): void{
      this.metasLista.push(meta);
    }
    
    getMetas(): Array<String>{
      return this.metasLista;
    }
  }
