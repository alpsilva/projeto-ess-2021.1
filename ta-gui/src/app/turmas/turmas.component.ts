import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../commons/turma';
import { TurmaService } from './turmas.service';
import { ClasseComponent } from '../classe/classe.component';

@Component({
   selector: 'app-root',
   templateUrl: './turmas.component.html',
   styleUrls: ['./turmas.component.css']
})

export class TurmasComponent implements OnInit {
  title = 'Turmas';

  turma: Turma = new Turma();
  delId: number = -1;
  turmas: Turma[] = [];
  
  constructor(private turmaService: TurmaService) {}
  
  classe: ClasseComponent = new ClasseComponent(this.turmaService);

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
    this.turmas = this.turmaService.getTurmas();
  }


  // router para ir para a página da turma
  goToTurma(id: number): void {
    console.log("goToTurma(" + id + ")");
    this.classe.setId(id);
    this.turmaService.updateAccessId(id);
    console.log("End of: goToTurma(" + id + ")");
    
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