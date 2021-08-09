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
    this.turmaService.atualizar(this.turma);
  }

  ngOnInit(): void {
    this.turmaId = this.turmaService.getAcessId();
    this.turma = this.turmaService.getOnlyTurma(this.turmaId);
    this.alunos = this.turma.getAlunos();
  }

  adicionarMeta(meta: string): void {
    this.turma = this.turmaService.adicionarMeta(this.turma, meta);
    this.turmaService.atualizar(this.turma);
  }
}