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
      this.turmaService.insertAluno(this.turma.id, result).subscribe(
        (ar) => { 
            if (ar == null){
              //alert("Unexpected fatal error trying to update class information! Please contact the systems administrators.");
            } else {
              this.aluno = new Aluno();
            }
          },
        //(msg) => { alert(msg.message); }
     );
    } else {
      this.cpfougitduplicado = true;
    }
  }

  deletarAluno(a: Aluno): void {
    if (confirm("Deseja mesmo excluir " + a.nome + "?")) {
      this.turmaService.deleteAluno(this.turma.id, a).subscribe(
        (ad) => { 
          if (ad == null){
            //alert("Unexpected fatal error trying to update class information! Please contact the systems administrators.");
          } else {
            var result = this.turma.deleteAluno(ad.cpf);
            this.alunos = this.turma.getAlunos();
            this.aluno = new Aluno();
          }
        },
        //(msg) => { alert(msg.message); }
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
      },
      //msg => { alert(msg.message);}
    );
  }

}