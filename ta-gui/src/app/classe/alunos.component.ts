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
      this.turmaService.atualizarAlunos(this.turma.id, this.turma.getAlunos()).subscribe(
        (as) => { 
            if (as == null){
              alert("Unexpected fatal error trying to update class information! Please contact the systems administrators.");
            } else {
              this.alunos = as;
              this.aluno = new Aluno();
            }
          },
        (msg) => { alert(msg.message); }
     );
    } else {
      this.cpfougitduplicado = true;
    }
  }

  deletarAluno(a: Aluno): void {
    var cpf = a.cpf;
    var result = this.turma.deleteAluno(cpf);
    if (result){
      this.turmaService.atualizarAlunos(this.turma.id, this.turma.getAlunos()).subscribe(
        (as) => { 
          if (as == null){
            alert("Unexpected fatal error trying to update class information! Please contact the systems administrators.");
          } else {
            this.alunos = as;
            this.aluno = new Aluno();
          }
        },
        (msg) => { alert(msg.message); }
     );
      
    }
  }

  onMove(): void {
      this.cpfougitduplicado = false;
  }

  ngOnInit(): void {
    this.turmaId = this.turmaService.getAcessId();
    this.turmaService.getOnlyTurma(this.turmaId).subscribe(
      t => {
        this.turma.copyFrom(t);
        this.alunos = this.turma.getAlunos();
      },
      msg => { alert(msg.message);}
    ); 
  }

}