import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ClasseRoutingModule } from './classe-routing.module';
import { ClasseComponent } from './classe.component';
import { MetasComponent } from './metas.component';
import { AlunosComponent } from './alunos.component';

@NgModule({
  declarations: [
    ClasseComponent,
    MetasComponent,
    AlunosComponent
  ],
  imports: [
    BrowserModule,
    ClasseRoutingModule,
    FormsModule,
    HttpClientModule, 
    RouterModule.forRoot([
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
  providers: [],
  bootstrap: [ClasseComponent]
})
export class AppModule { }