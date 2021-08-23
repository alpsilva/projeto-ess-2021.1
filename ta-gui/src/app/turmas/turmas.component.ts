import { Component, OnInit, Inject } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import * as XLSX from 'xlsx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Turma } from '../../../../commons/turma';
import { Aluno } from '../../../../commons/aluno';
import { TurmaService } from './turmas.service';
import { ClasseComponent } from '../classe/classe.component';

interface FileType {
  type: string;
}

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
  turmaToDel: Turma;

  fileType: string = "";
  exportAsCsv: boolean = false;
  exportAsExcel: boolean = false;

  
  constructor(private turmaService: TurmaService, public dialog: MatDialog) {}
  
  classe: ClasseComponent = new ClasseComponent(this.turmaService);

  /*
    Criação de turma: 
  */
  criarTurma(t: Turma): void {
    if (this.turmas.length < 3){
      if (!this.nomeDuplicado(t)){
        this.turmaService.criar(t)
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

  /*
    Verificação de nome de turma: 
  */
  nomeDuplicado(t: Turma): boolean {
    // Procura na lista de turmas se alguma tem o mesmo nome
    for (let i = 0; i < this.turmas.length; i++){
      if (this.turmas[i].nome == t.nome){
        return true;
      }
    }
    return false;
  }

  /*
    Deletar turma: 
  */
  deletarTurma(id: number): void {
    if (confirm("Você quem mesmo deletar a Turma " + id + "?")) {
      if (this.turmaToDel) {
        /*
          Fase de Exportação 
        */
        this.openDialog();
        this.exportTurmaTo();
        /*
          Fase de remoção 
        */
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
  }

  /*
    Função OnInit: 
  */
  ngOnInit(): void {
    this.turmaService.updateIdLivre();
    this.turmaService.getTurmas()
        .subscribe(
          tl => {this.turmas = tl;},
          msg => { console.error(msg.message);}
        );
  }

  /*
    Função auxiliar (para remoção de turma): 
  */
  setTurmaToDel(id: number): void {
    this.turmaService.getOnlyTurma(id).subscribe(
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
        for (let a of nt.alunoLista.alunos) {
          this.turmaService.getMetasOf(nt.id, a).subscribe(
            metas => {
              for (let m of metas) {
                a.metas.set(m[0], m[1]);
                a.tuplaMetas.push(m);
              }
            },
            msg => {console.log(msg.message);}
          );
        }
        this.turmaToDel = nt;
    },
    msg => { alert(msg.message);}
    );
  }

  /*
    Função auxiliar (para exportação): 
  */
  exportTurmaTo(): string {    
    if (this.turmaToDel) {
      return this.exportTurmaData(this.turmaToDel);
    }
    return null;
  }

  /*
    Função auxiliar (para exportação): 
  */
  exportTurmaData(turma: Turma): string {
    var email: string = "E-mail";
    var dataAlunos = [];
    
    for (let a of turma.alunoLista.alunos) {
      var mean: number = 0;
      var aluno = {
        Nome: a.nome,
        Cpf: a.cpf,
        [email]: a.email,
        Github: a.github
      };
      for (let m of turma.metasLista) {
        aluno[m] = "";
      }
      for (let m of a.tuplaMetas) {
        aluno[m[0]] = m[1];
        if (m[1] == "MA") {
          mean += 2.0;
        } else if (m[1] == "MPA") {
          mean += 0.8;
        }
      }
      if (mean >= 6) {
        aluno["Situação"] = "Aprovado";
      } else if (mean >= 3) {
        aluno["Situação"] = "Final";
      } else {
        aluno["Situação"] = "Reprovado";
      }      
      dataAlunos.push(aluno);
    }
    const options = {
      filename: turma.nome,
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: turma.nome,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    }

    const csvExporter = new ExportToCsv(options);

    if (this.fileType == 'csv') {
      this.exportAsCsv = true;
    } else if (this.fileType == 'xlsx') {
      this.exportAsExcel = true;
    }

    if (this.exportAsExcel) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataAlunos);
  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, turma.nome)
  
      XLSX.writeFile(wb, turma.nome + ".xlsx");
    } else if (this.exportAsCsv) {
      csvExporter.generateCsv(JSON.stringify(dataAlunos));
    }

    this.exportAsExcel = false;
    this.exportAsCsv = false;
    this.fileType = "";
    return JSON.stringify(dataAlunos);
  }

  /*
    Função auxiliar (para exportação): 
  */
  openDialog() {
    this.fileType = "";
    const dialogRef = this.dialog.open(SelectorFileTypeDialog, {
      width: '600px',
      data: {type: this.fileType}
    });

    dialogRef.afterClosed().subscribe(
      choice => {
        this.fileType = choice;
        this.exportTurmaData(this.turmaToDel);
      }
    );

    if (this.turmaToDel) {
      if (this.fileType != "") {
        this.exportTurmaData(this.turmaToDel);
      }
    }
  }
}



/*  ==========================================================
      CLASSE DO DIALOG DE EXPORTAÇÃO DA TURMA ABAIXO
    ==========================================================
*/

@Component({
  selector: 'selector-file-type-dialog',
  templateUrl: './selector-file-type-dialog.html',
  styleUrls: ['./turmas.component.css']
})
export class SelectorFileTypeDialog {

  constructor(
    public dialogRef: MatDialogRef<SelectorFileTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FileType) {}

  setFileTypeCsv() {
    this.data.type = 'csv';
  }

  setFileTypeXlsx() {
    this.data.type = 'xlsx';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}