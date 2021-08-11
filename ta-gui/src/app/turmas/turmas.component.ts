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
    if (this.turmas.length < 3){
      if (!this.nomeDuplicado(t)){
        var result = this.turmaService.criar(t)
                        .subscribe(
                          tr => {
                            if (tr) {
                              this.turmas.push(tr);
                              this.turma = new Turma();
                            } else {
                              //server POST failure msg
                            }
                          },
                          msg => { msg.alert }
                        );
      } else {
        alert("Nome duplicado! Turmas devem ter nomes únicos.");
        this.turma.nome = "";
      }
    } else {
      alert("Limite de 3 turmas atingido! Delete uma antes de tentar registrar a nova.");
    }
  }

  nomeDuplicado(t: Turma): boolean {
    // Procura na lista de turmas se alguma tem o mesmo nome
    for (let i = 0; i < this.turmas.length; i++){
      if (this.turmas[i].nome == t.nome){
        return true;
      }
    }
    return false;
  }

  deletarTurma(id: number): void {
    if (confirm("Você quem mesmo deletar a Turma " + id + "?")) {
      this.turmaService.deletar(id).subscribe(
        resultId => {
          if (resultId == id) {
            // Procura o index do objeto td a ser deletado e usa o método splice para tirar ele do array.
            for (let i = 0; i < this.turmas.length; i++){
              if (this.turmas[i].id == id){
                this.turmas.splice(i, 1);
              }
            }    
          }
        },
        msg => { alert(msg.message); }
      );
    }
  }

  onMove(): void {
    //pode vir a ter algo
  }

  ngOnInit(): void {
    this.turmaService.getTurmas()
        .subscribe(
          tl => {this.turmas = tl;},
          msg => { console.error(msg.message);}
        );
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