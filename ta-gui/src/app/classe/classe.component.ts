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

  title = this.turma.nome;

  aluno: Aluno = new Aluno();
  delCpf: string = "";

  constructor(private turmaService: TurmaService) {}

  // informações da turma

  // lista de alunos
  // adicionar/remover alunos
  // botar notas nas metas dos alunos
  
  // adicionar metas para a turma
  

  criarTurma(t: Turma): void {
    var result = this.turmaService.criar(t);
    if (result){
      this.turmas.push(result);
      this.turma = new Turma();
    }
  }

  deletarTurma(id: number): void {
    var result = this.turmaService.deletar(id);
    if (result){
      // Procura o index do objeto td a ser deletado e usa o método splice para tirar ele do array.
      for (let i = 0; i < this.turmas.length; i++){
        if (this.turmas[i].id == result.id){
          this.turmas.splice(i, 1);
        }
      }    
    }
  }

  onMove(): void {
    //pode vir a ter algo
  }

  ngOnInit(): void {
    this.turmaId = 
    this.turma = this.turmaService.getOnlyTurma(this.turmaId);
  }


  // router para ir para a página da turma
  goToTurma(id: number): void{
    // algum tipo de lógica para redirecionar a página para o endereço da turma que possui identificação == id
  }

}

  // this will be used when we have a server

  /*

    criarTurma(t: Turma): void {
      this.turmaService.criar(t)
            .subscribe(
              tr => {
                if (tr) {
                  this.turmas.push(tr);
                  this.turma = new Turma();
                }
              },
              msg => { alert(msg.message); }
            );
    }

    deletarTurma(id: number): void {
      this.turmaService.deletar(id).subscribe(
        td => {
          if (td) {
            // Procura o index do objeto ad a ser deletado e usa o método splice para tirar ele do array.
            for (let i = 0; i < this.turmas.length; i++){
              if (this.turmas[i].id == td.id){
                this.turmas.splice(i, 1);
              }
            }          
          }
        },
        msg => { alert(msg.message); }
      );
    }

    onMove(): void {
      //pode vir a ter algo
    }

    ngOnInit(): void {
      this.turmaService.getTurmas()
            .subscribe(
              ts => { this.turmas = ts; },
              msg => { alert(msg.message); }
            );
    }

  */
