import { Aluno } from "./aluno";

export class CadastroAlunos{

    alunos: Aluno[] = [];

    criar(aluno: Aluno): Aluno {
      aluno = aluno.clone();
      var result = null;
      if (this.cpfNaoCadastrado(aluno.cpf)) {
        this.alunos.push(aluno);
        result = aluno;
      }
      return result;
    }
  
    cpfNaoCadastrado(cpf: string): boolean {
       return !this.alunos.find(a => a.cpf == cpf);
    }
  
    atualizar(aluno: Aluno): void {
      aluno = aluno.clone();
      for (let a of this.alunos) {
          if (a.cpf == aluno.cpf) {
             a.metas = aluno.metas;
          }
      }
    }

    deletar(cpf: string): Aluno {
        var result = null;
    
        for (let i = 0; i < this.alunos.length; i++){
            if (this.alunos[i].cpf == cpf){
                result = this.alunos[i].clone();
                this.alunos.splice(i, 1);
            }
        }  
    
        return result;
      }
  
    getAlunos(): Aluno[] {
      var result: Aluno[] = [];
      for (let a of this.alunos) {
        result.push(a.clone());
      }
      return result;
    }

    copyCadastroAlunosFrom(from: CadastroAlunos): void {
      //console.log("copyCadastroAlunosFrom([alunos: '" + from.alunos + "'])");
        this.alunos = [];
        for (let i = 0; i < from.alunos.length; i++) {
          this.alunos[i] = from.alunos[i];
        }
      //console.log("End of: copyCadastroAlunosFrom([alunos: '" + from.alunos + "'])");
    }

}