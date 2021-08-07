import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher.component';
import { TurmasComponent } from './turmas/turmas.component';
import { Turma } from '../../../commons/turma';
import { Aluno } from '../../../commons/aluno';
import { TurmaService } from './turmas/turmas.service';
import { ClasseComponent } from './classe/classe.component';
import { AlunosComponent } from './classe/alunos.component';
import { MetasComponent } from './classe/metas.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    TurmasComponent,
    ClasseComponent,
    AlunosComponent,
    MetasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'teacher',
        component: TeacherComponent
      }
    ]),
    RouterModule.forChild([
      {
        path: 'turmas',
        component: TurmasComponent
      },
      {
        path: 'classe',
        component: ClasseComponent
      },
      {
        path: 'metas',
        component: MetasComponent
      },
      {
        path: 'alunos',
        component: AlunosComponent
      }
    ])
  ],
  providers: [TurmaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
