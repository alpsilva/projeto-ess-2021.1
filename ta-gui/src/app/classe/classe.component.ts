import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../commons/turma';
import { TurmaService } from '../turmas/turmas.service';
import { Aluno } from '../../../../commons/aluno';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  turmaId: number = -1;
  turma: Turma = new Turma();
  listaTurmas: Turma[] = [];
  title = this.turma.nome;

  aluno: Aluno = new Aluno();
  delCpf: string = "";

  constructor(private turmaService: TurmaService) {}

  onMove(): void {
    //pode vir a ter algo
  }

  ngOnInit(): void {
    this.listaTurmas = this.turmaService.getTurmas();
    console.log("classe component => ngOnInit()");
    console.log("classe component => ngOnInit() : this.title = " + this.title);
    console.log("classe component => ngOnInit() : this.turmaId = " + this.turmaId);
    console.log("classe component => ngOnInit() : this.turma = " + this.turma.toString());
  }

  setId(id: number): void {
    console.log("setId(" + id + ")");
    this.turmaId = id;
    this.turma = this.turmaService.getOnlyTurma(this.turmaId);
    console.log("End of: setId(" + id + ")");
  }

}