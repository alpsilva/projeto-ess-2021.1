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
      //console.log("clone()");
      var turma: Turma = new Turma();
      turma.copyFrom(this);
      //console.log("End of: clone()");

      return turma;
    }
  
    copyFrom(from: Turma): void {
      //console.log("copyFrom(" + from.toString() + ")");
      this.nome = from.nome;
      this.descricao = from.descricao;
      this.id = from.id;
      this.alunoLista.copyCadastroAlunosFrom(from.alunoLista);
      for (let i = 0; i < from.metasLista.length; i++) {
        this.metasLista[i] = from.metasLista[i];
      }
      //console.log("End of: copyFrom(" + from.toString() + ")");
    }

    insertAluno(a: Aluno): Aluno{
      return this.alunoLista.criar(a);
    }

    getAlunos(): Aluno[]{
      return this.alunoLista.getAlunos();
    }

    getOnlyAluno(cpf: string): Aluno {
      return this.alunoLista.getAluno(cpf);
    }

    updateAluno(a: Aluno): void{
      this.alunoLista.atualizar(a);
    }

    deleteAluno(cpf: string): Aluno{
      return this.alunoLista.deletar(cpf);
    }

    cleanAlunos(): void {
      this.alunoLista = new CadastroAlunos();
    }

    insertManyAlunos(as: Array<Aluno>): void{
      for (let a of as){
        this.alunoLista.criar(a);
      }
    }

    cleanMetas(): void {
      this.metasLista = new Array<string>();
    }

    insertManyMetas(ms: Array<string>): void{
      for (let m of ms){
        this.metasLista.push(m);
      }
    }

    toString(): string {
      var result: string = "[";
      result = result + "nome: " + this.nome + ", ";
      result = result + "id: " + this.id + "]";
      return result;
    }

    insertMeta(meta: string): string{
      var metaExists: boolean = false;
      var result = null;
      for (let m in this.metasLista) {
        if (m == meta) {
          metaExists = true;
        }
      }
      if (!metaExists) {
        this.metasLista.push(meta);
        result = meta;
      }
      return result
    }

    removeLastMeta(): void{
      this.metasLista.splice(-1);
    }
    
    getMetas(): Array<string>{
      return this.metasLista;
    }
  }
