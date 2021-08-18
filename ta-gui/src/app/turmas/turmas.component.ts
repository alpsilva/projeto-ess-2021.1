import { Component, OnInit, Inject } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import * as XLSX from 'xlsx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Turma } from '../../../../commons/turma';
import { Aluno } from '../../../../commons/aluno';
import { TurmaService } from './turmas.service';
import { ClasseComponent } from '../classe/classe.component';
import { stringify } from '@angular/compiler/src/util';

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

  fileType: string;
  exportAsCsv: boolean = false;
  exportAsExcel: boolean = false;

  
  constructor(private turmaService: TurmaService, public dialog: MatDialog) {}
  
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
                          //msg => { msg.alert }
                        );
      } else {
        //alert("Nome duplicado! Turmas devem ter nomes únicos.");
        this.turma.nome = "";
      }
    } else {
      //alert("Limite de 3 turmas atingido! Delete uma antes de tentar registrar a nova.");
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
    console.log(this.turmaToDel);
    if (confirm("Você quem mesmo deletar a Turma " + id + "?")) {
      console.log(this.turmaToDel);
      if (this.turmaToDel) {
        this.openDialog();
        var result: string = this.exportTurmaTo();
        console.log(result);
        /*
          Exportar turma aqui 
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

  onMove(): void {
    //pode vir a ter algo
  }

  ngOnInit(): void {
    this.turmaService.updateIdLivre();
    this.turmaService.getTurmas()
        .subscribe(
          tl => {this.turmas = tl;},
          msg => { console.error(msg.message);}
        );
  }

  goToTurma(id: number): void {
    console.log("goToTurma(" + id + ")");
    this.classe.setId(id);
    this.turmaService.updateAccessId(id);
    console.log("End of: goToTurma(" + id + ")");
  }

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
        console.log(this.turmaToDel);
    },
    msg => { alert(msg.message);}
    );
  }

  exportTurmaTo(): string {    
    if (this.turmaToDel) {
      return this.stringifyTurmaData(this.turmaToDel);
    }
    return null;
  }

  stringifyTurmaData(turma: Turma): string {
    var listaMetas: string[] = turma.metasLista;
    var email: string = "E-mail";
    var dataAlunos = [];
    console.log(turma.alunoLista.alunos);
    


    for (let a of turma.alunoLista.alunos) {
      var aMetas = [];
      var mean: number = 0;
      console.log(a);
      var aluno = {
        Nome: a.nome,
        Cpf: a.cpf,
        [email]: a.email,
        Github: a.github
      };
      for (let m of a.tuplaMetas) {
        aMetas.push({
          [m[0]]: m[1]
        });
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
      var stringMetas: string = JSON.stringify(aMetas);
      
      dataAlunos.push(aluno);
      console.log(dataAlunos);
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
    return JSON.stringify(dataAlunos);
  }

  openDialog() {
    this.fileType = "";
    const dialogRef = this.dialog.open(SelectorFileTypeDialog, {
      width: '600px',
      data: {type: this.fileType}
    });

    dialogRef.afterClosed().subscribe(
      choice => {
        this.fileType = choice;
        console.log(choice);
        this.stringifyTurmaData(this.turmaToDel);
        console.log(this.fileType);
      }
    );

    if (this.turmaToDel) {
      if (this.fileType != "") {
        this.stringifyTurmaData(this.turmaToDel);
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
    console.log(this.data.type);
  }

  setFileTypeXlsx() {
    this.data.type = 'xlsx';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}