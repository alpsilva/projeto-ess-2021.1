import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher.component';
import { TurmasComponent } from './turmas/turmas.component';

const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
    children:[
      {
        path: 'teacher/turmas',
        component: TeacherComponent,
        children:[
          {
            path: 'teacher/turmas/classe/:id',
            component: TurmasComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
