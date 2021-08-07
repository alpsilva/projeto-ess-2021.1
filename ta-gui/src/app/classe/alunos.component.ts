import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../commons/turma';
import { TurmaService } from '../turmas/turmas.service';
import { Aluno } from '../../../../commons/aluno';

@Component({
  selector: 'alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})

export class AlunosComponent implements OnInit {

  turmaId: number = 1;
  turma: Turma = new Turma();

  aluno: Aluno = new Aluno();

  cpfougitduplicado: boolean = false;

  // array de alunos local
  alunos: Aluno[] = new Array<Aluno>();

  constructor(private turmaService: TurmaService) {}

  criarAluno(a: Aluno): void {
    var result = this.turma.insertAluno(a);
    if (result){
      this.turmaService.atualizar(this.turma);
      this.alunos.push(result);
      this.aluno = new Aluno();
    } else {
      this.cpfougitduplicado = true;
    }
  }

  deletarAluno(a: Aluno): void {
    var cpf = a.cpf;
    var result = this.turma.deleteAluno(cpf);
    if (result){
      this.turmaService.atualizar(this.turma);
      // procura a posição do objeto deletado no array local e dá splice
      for (let i = 0; i < this.alunos.length; i++){
        if (this.alunos[i].cpf == result.cpf){
          this.alunos.splice(i, 1);
        }
      }
      this.aluno = new Aluno();
    }
  }

  onMove(): void {
      this.cpfougitduplicado = false;
  }

  ngOnInit(): void {
    // falta setar a turma
    this.turma = this.turmaService.getOnlyTurma(this.turmaId);
    this.alunos = this.turma.getAlunos();
  }

}