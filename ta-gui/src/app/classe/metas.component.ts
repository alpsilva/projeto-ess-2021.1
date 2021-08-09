import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Turma } from '../../../../commons/turma';
import { TurmaService } from '../turmas/turmas.service';
import { Aluno } from '../../../../commons/aluno';

@Component({
  selector: 'metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})

export class MetasComponent implements OnInit {
  constructor(private turmaService: TurmaService) {}
  
  turmaId: number = 1;
  turma: Turma = new Turma();
  novaMeta: string = "";

  alunos: Aluno[];

  atualizarAluno(aluno: Aluno): void{
    this.turma.updateAluno(aluno);
    this.turmaService.atualizar(this.turma).subscribe(
      (t) => { if (t == null) alert("Unexpected fatal error trying to update student information! Please contact the systems administrators."); },
      (msg) => { alert(msg.message); }
   );;
  }

  ngOnInit(): void {
    this.turmaId = this.turmaService.getAcessId();
    this.turmaService.getOnlyTurma(this.turmaId).subscribe(
      t => {
        this.turma = t;
        this.alunos = this.turma.getAlunos();
      },
      msg => { alert(msg.message);}
    ); 
  }

  adicionarMeta(meta: string): void {
    this.turma = this.turmaService.adicionarMeta(this.turma, meta);
    this.turmaService.atualizar(this.turma).subscribe(
      (t) => { if (t == null) alert("Unexpected fatal error trying to update class information! Please contact the systems administrators."); },
      (msg) => { alert(msg.message); }
   );;
  }
}