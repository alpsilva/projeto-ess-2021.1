import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher.component';
import { StudentViewComponent } from './studentView.component';
import { TurmasComponent, SelectorFileTypeDialog } from './turmas/turmas.component';
import { Turma } from '../../../commons/turma';
import { Aluno } from '../../../commons/aluno';
import { TurmaService } from './turmas/turmas.service';
import { ClasseComponent } from './classe/classe.component';
import { AlunosComponent } from './classe/alunos.component';
import { MetasComponent } from './classe/metas.component';
import { MatDialog } from '@angular/material/dialog';
import { PerfReportComponent } from './perf-report/perf-report.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentViewComponent,
    TurmasComponent,
    ClasseComponent,
    AlunosComponent,
    MetasComponent,
    SelectorFileTypeDialog,
    PerfReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    GoogleChartsModule,
    RouterModule.forRoot([
      {
        path: 'teacher',
        component: TeacherComponent
      },
      {
        path: 'studentView',
        component: StudentViewComponent
      }
    ]),
    RouterModule.forChild([
      {
        path: 'teacher/turmas',
        component: TurmasComponent
      },
      {
        path: 'teacher/turmas/classe/:id',
        component: ClasseComponent
      },
      {
        path: 'teacher/turmas/classe/:id/metas',
        component: MetasComponent
      },
      {
        path: 'teacher/turmas/classe/:id/alunos',
        component: AlunosComponent
      },
      {
        path: 'teacher/turmas/classe/:id/performance',
        component: PerfReportComponent
      }
    ])
  ],
  providers: [TurmaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
