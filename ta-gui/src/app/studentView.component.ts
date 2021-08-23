import { Component, OnInit, Inject } from '@angular/core';

import { Turma } from '../../../commons/turma';
import { TurmaService } from './turmas/turmas.service';

@Component({
   selector: 'app-root',
   templateUrl: './studentView.component.html',
   styleUrls: ['./studentView.component.css']
})

export class StudentViewComponent implements OnInit {
  title = 'Aluno';

  studentCpf:string = "";
  turmas: Turma[] = [];
  grades: Map<number, Map<string, string>> = new Map<number, Map<string, string>>();

  constructor(private turmaService: TurmaService) {}

  getAllEnrolledClasses(cpf: string): void {
    this.turmas = [];
    this.turmaService.getTurmas().subscribe(
      allTurmas => {
        if (allTurmas) {
            for (let t of allTurmas){
              for (let a of t.alunoLista.alunos){
                  if (a.cpf == this.studentCpf){
                    this.turmas.push(t);
                    let metas: Map<string, string> = new Map<string, string>();
                    this.turmaService.getMetasOf(t.id, a).subscribe(
                      ms => {
                        for (let m of ms) {
                          metas.set(m[0], m[1]);
                        }
                        this.grades.set(t.id, metas);
                      },
                      msg => {console.log(msg.message);}
                    );
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

  getGrade(id: number, meta: string): string {
    var metas: Map<string, string> = new Map<string, string>(this.grades.get(id));
    var str = metas.get(meta);
    return str;
  }

  ngOnInit(): void {

  }
}

