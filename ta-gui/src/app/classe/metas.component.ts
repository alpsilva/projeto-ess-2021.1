import { Component, OnInit } from '@angular/core';

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

  alunos: Aluno[] = [];

  atualizarAluno(aluno: Aluno): void{
    this.turma.updateAluno(aluno);
    this.turmaService.atualizarMetasUmAluno(this.turma.id, aluno.cpf, aluno.metas).subscribe(
      (as) => { if (as == null){
        alert("Unexpected fatal error trying to update student information! Please contact the systems administrators.");
      }
    },
      (msg) => { alert(msg.message); }
    );
  }

  ngOnInit(): void {
    this.beginInit();
    this.atualizarMetas();
  }

  beginInit(): void {
    this.turmaId = this.turmaService.getAcessId();
    this.turmaService.updateTurmas();
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
        this.alunos = this.turma.alunoLista.alunos;
        for (let a of this.alunos) {
          this.turmaService.getMetasOf(this.turma.id, a).subscribe(
            metas => {
              for (let m of metas) {
                a.metas.set(m[0], m[1]);
              }
            },
            msg => {console.log(msg.message);}
          );
        }
      },
      msg => { alert(msg.message);}
    );
  }

  onMove(): void {
    this.atualizarMetas();
  }

  adicionarMeta(meta: string): void {
    var result = this.turma.insertMeta(meta);
    if (result){
      this.turmaService.atualizarListaMetas(this.turma.id, this.turma.metasLista).subscribe(
        (ms) => { if (ms == null){
          alert("Unexpected fatal error trying to update class information! Please contact the systems administrators.");
          //removes newly added goal
          this.turma.removeLastMeta();
        } else {
          this.turma.metasLista = ms;
          this.novaMeta = "";
        }
      },
      (msg) => { alert(msg.message); }
     );
    } else {
      alert("Meta já existente!");
      this.novaMeta = "";
    }
  }

  atualizarMetas(): void {
    for (let a of this.alunos) {
      this.turmaService.getMetasOf(this.turma.id, a).subscribe(
        metas => {
          for (let m of metas) {
            a.metas.set(m[0], m[1]);
          }
        },
        msg => {console.log(msg.message);}
      );
    }
  }
}