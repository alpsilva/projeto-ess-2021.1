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

  turmaId: number;
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
    this.turmaId = this.turmaService.getAcessId();
    this.turmaService.getOnlyTurma(this.turmaId).subscribe(
      t => {
        var nt: Turma = new Turma();
        nt.nome = t.nome;
        nt.descricao = t.descricao;
        nt.id = t.id;
        for (let a of t.alunoLista.alunos){
          var aluno: Aluno = new Aluno();
          aluno.nome = a.nome;
          aluno.cpf = a.cpf;
          aluno.email = a.email;
          aluno.github = a.github;
          for(var value in a.metas){
            aluno.metas.set(value, a.metas.get(value));
          }
          nt.insertAluno(aluno);
        }
        for (let m of t.metasLista){
          nt.insertMeta(m);
        }
        this.turma = nt;
      },
      msg => { alert(msg.message);}
    );
  }

  setId(id: number): void {
    console.log("setId(" + id + ")");
    this.turmaId = id;
    this.turmaService.getOnlyTurma(this.turmaId).subscribe(
      t => {
        this.turma = t;
      },
      msg => { alert(msg.message);}
    ); 
    console.log("End of: setId(" + id + ")");
  }
}