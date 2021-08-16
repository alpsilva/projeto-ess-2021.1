import { Component, OnInit, Inject } from '@angular/core';

import { Turma } from '../../../commons/turma';
import { Aluno } from '../../../commons/aluno';
import { TurmaService } from './turmas/turmas.service';

@Component({
   selector: 'app-root',
   templateUrl: './studentView.component.html',
   styleUrls: ['./studentView.component.css']
})

export class StudentViewComponent implements OnInit {
  title = 'Aluno';

  studentCpf:string = "-1";
  turmas: Turma[] = [];

  constructor(private turmaService: TurmaService) {}

  getAllEnrolledClasses(cpf: string): void {
    this.turmaService.getTurmas().subscribe(
        allTurmas => {
          if (allTurmas) {
              for (let t of allTurmas){
                  for (let a of t.getAlunos()){
                      if (a.cpf == this.studentCpf){
                        this.turmaService.getMetasOf(t.id, a).subscribe(
                            metas => {
                              console.log(metas);
                              for (let m of metas) {
                                a.metas.set(m[0], m[1]);
                              }
                            },
                            msg => {console.log(msg.message);}
                          );
                          this.turmas.push(t);
                      }
                  }
              }           
          } else {
            //server POST failure msg
          }
        },
        msg => { msg.alert }
      );
  }

  onMove(): void {
    //pode vir a ter algo
  }

  ngOnInit(): void {

  }
}

