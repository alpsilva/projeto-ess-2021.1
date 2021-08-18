import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../commons/turma';
import { Aluno } from '../../../../commons/aluno';
import { TurmaService } from '../turmas/turmas.service';
import { ChartType } from 'angular-google-charts';

declare var google: any;

@Component({
  selector: 'app-perf-report',
  templateUrl: './perf-report.component.html',
  styleUrls: ['./perf-report.component.css']
})
export class PerfReportComponent implements OnInit {
  
  constructor(private turmaService: TurmaService) { }
  
  selectedOption: string = "";
  options: string[] = [
    "Todos os alunos",
    "Alunos Aprovados",
    "Alunos na Final",
    "Alunos Reprovados",
    "Alunos que não estão Aprovados",
    "Alunos que não estão na Final",
    "Alunos que não estão Reprovados"
  ]

  turmaId: number = 1;
  turma: Turma = new Turma();
  
  alunos: Aluno[] = [];
  metas: string[] = [];

  selectedLista: Aluno[] = [];
  situacaoAlunos: string[] = [];
  chooseOpt: Boolean = false;
  
  meanTitle = ""; 
  meanType = ChartType.PieChart;
  meanData: [string, number][] = [
    ["Aprovado", 0],
    ["Final", 0],
    ["Reprovado", 0]
  ];
  meanCollumns: string[] = ["Nota", "Quantidade de Alunos"];
  meanOptions: {};

  data: google.visualization.DataTable;
  chart: google.visualization.PieChart;

  onMove() {
    if (this.alunos.length > 0) {
      this.meanTitle = "Desempenho: ";
      //this.updateChart();
    } else {
      this.meanTitle = "Not enough data on: ";
    }
  }

  setGraphOption(option: string) {
    console.log("SetGraphOption choosen is " + option);
    if (option != "") {
      this.chooseOpt = false;
      this.updateChart(option);
      this.updateSelectedLista(option);
    } else {
      this.chooseOpt = true;
    }
    this.selectedOption = option;
  }

  updateButtonFunc() {
    this.turmaId = this.turmaService.getAcessId();
    this.turmaService.updateTurmas();
    this.meanData[0][1] = 0;
    this.meanData[1][1] = 0;
    this.meanData[2][1] = 0;
    this.turmaService.getOnlyTurma(this.turmaId).subscribe(
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
        this.turma = nt;
        this.metas = this.turma.metasLista;
        this.alunos = this.turma.alunoLista.alunos;
        for (let a of this.alunos) {
          this.turmaService.getMetasOf(this.turma.id, a).subscribe(
            metas => {
              for (let m of metas) {
                a.metas.set(m[0], m[1]);
              }
              this.updateChart("");
            },
            msg => {console.log(msg.message);}
          );
        }
        this.updateChart("");
      },
      msg => { alert(msg.message);}
    );
    this.updateChart("");
  }

  updateSelectedLista(viewOption: string) {
    this.selectedLista = [];
    this.situacaoAlunos = [];
    for (let a of this.alunos) {
      var aInfo: string;
      var mean: number = 0;
      for (let m of a.metas) {
        aInfo = m[1];
        if (aInfo == "MA") {
          mean += 2.0;
        } else if (aInfo == "MPA") {
          mean += 0.8;
        }
      }
      switch (viewOption) {
        case ("Todos os alunos"):
        console.log("Inside Case: " + viewOption);
        this.selectedLista.push(a);
        if (mean >= 6) {
          this.situacaoAlunos.push("Aprovado");
        } else if (mean >= 3) {
          this.situacaoAlunos.push("Final");
        } else {
          this.situacaoAlunos.push("Reprovado");
        }
        break;
      case ("Alunos Aprovados"):
        console.log("Inside Case: " + viewOption);
        if (mean >= 6) {
          this.selectedLista.push(a);
          this.situacaoAlunos.push("Aprovado");
        }
        break;
      case ("Alunos na Final"):
        console.log("Inside Case: " + viewOption);
        if (mean >= 3 && mean < 6) {
          this.selectedLista.push(a);
          this.situacaoAlunos.push("Final");
        }
        break;
      case ("Alunos Reprovados"):
        console.log("Inside Case: " + viewOption);
        if (mean < 3) {
          this.selectedLista.push(a);
          this.situacaoAlunos.push("Reprovado");
        }
        break;
      case ("Alunos que não estão Aprovados"):
        console.log("Inside Case: " + viewOption);
        if (mean < 6) {
          this.selectedLista.push(a);
          if (mean >= 3) {
            this.situacaoAlunos.push("Final");
          } else {
            this.situacaoAlunos.push("Reprovado");
          }
        }
        break;
      case ("Alunos que não estão na Final"):
        console.log("Inside Case: " + viewOption);
        if (mean >= 6 || mean < 3) {
          this.selectedLista.push(a);
          if (mean >= 6) {
            this.situacaoAlunos.push("Aprovado");
          } else {
            this.situacaoAlunos.push("Reprovado");
          }
        }
        break;
      case ("Alunos que não estão Reprovados"):
        console.log("Inside Case: " + viewOption);
        if (mean >= 3) {
          this.selectedLista.push(a);
          if (mean >= 6) {
            this.situacaoAlunos.push("Aprovado");
          } else {
            this.situacaoAlunos.push("Final");
          }
        }
        break;
      }
    }
  }
  
  updateChart(viewOption: string) {
    this.meanTitle = "Desempenho: ";
    this.meanData[0][1] = 0;
    this.meanData[1][1] = 0;
    this.meanData[2][1] = 0;
    
    for (let a of this.alunos) {
      var aInfo: string;
      var mean: number = 0;
      for (let m of a.metas) {
        aInfo = m[1];
        if (aInfo == "MA") {
          mean += 2.0;
        } else if (aInfo == "MPA") {
          mean += 0.8;
        }
      }
      if (mean >= 6) {
        this.meanData[0][1] += 1;
      } else if (mean >= 3) {
        this.meanData[1][1] += 1;
      } else {
        this.meanData[2][1] += 1;
      }
    }
    this.data = new google.visualization.arrayToDataTable([
      ["Nota", "Quantidade de Alunos"],
      [this.meanData[0][0], this.meanData[0][1]],
      [this.meanData[1][0], this.meanData[1][1]],
      [this.meanData[2][0], this.meanData[2][1]]
    ]);

    this.meanOptions = {
      title: this.meanTitle + this.turma.nome,
      colors: ['green','yellow','red'],
      is3D: false
    }

    console.log("Case: " + viewOption);
    switch (viewOption) {
      case (""):
        console.log("Inside Case: " + viewOption);
        this.meanOptions = {
          legend: 'none',
          title: this.meanTitle + this.turma.nome,
          colors: ['green','yellow','red'],
          is3D: false,
          slices: {
            0: { color: 'transparent'},
            1: { color: 'transparent'},
            2: { color: 'transparent'}
          }
        };
        break;
      case ("Todos os alunos"):
        console.log("Inside Case: " + viewOption);
        this.meanOptions = {
          title: this.meanTitle + this.turma.nome,
          colors: ['green','yellow','red'],
          is3D: false
        };
        break;
      case ("Alunos Aprovados"):
        console.log("Inside Case: " + viewOption);
        this.meanOptions = {
          title: this.meanTitle + this.turma.nome,
          colors: ['green','yellow','red'],
          is3D: false,
          slices: {
            0: { color: 'green'},
            1: { color: 'transparent'},
            2: { color: 'transparent'}
          }
        };
        break;
      case ("Alunos na Final"):
        console.log("Inside Case: " + viewOption);
        this.meanOptions = {
          title: this.meanTitle + this.turma.nome,
          colors: ['green','yellow','red'],
          is3D: false,
          slices: {
            0: { color: 'transparent'},
            1: { color: 'yellow'},
            2: { color: 'transparent'}
          }
        };
        break;
      case ("Alunos Reprovados"):
        console.log("Inside Case: " + viewOption);
        this.meanOptions = {
          title: this.meanTitle + this.turma.nome,
          colors: ['green','yellow','red'],
          is3D: false,
          slices: {
            0: { color: 'transparent'},
            1: { color: 'transparent'},
            2: { color: 'red'}
          }
        };
        break;
      case ("Alunos que não estão Aprovados"):
        console.log("Inside Case: " + viewOption);
        this.meanOptions = {
          title: this.meanTitle + this.turma.nome,
          colors: ['green','yellow','red'],
          is3D: false,
          slices: {
            0: { color: 'transparent'},
            1: { color: 'yellow'},
            2: { color: 'red'}
          }
        };
        break;
      case ("Alunos que não estão na Final"):
        console.log("Inside Case: " + viewOption);
        this.meanOptions = {
          title: this.meanTitle + this.turma.nome,
          colors: ['green','yellow','red'],
          is3D: false,
          slices: {
            0: { color: 'green'},
            1: { color: 'transparent'},
            2: { color: 'red'}
          }
        };
        break;
      case ("Alunos que não estão Reprovados"):
        console.log("Inside Case: " + viewOption);
        this.meanOptions = {
          title: this.meanTitle + this.turma.nome,
          colors: ['green','yellow','red'],
          is3D: false,
          slices: {
            0: { color: 'green'},
            1: { color: 'yellow'},
            2: { color: 'transparent'}
          }
        };
        break;
    }

    this.chart = new google.visualization.PieChart(document.getElementById('meanChart'));

    if (viewOption != "") {
      console.log('View Option == ""');
      this.chart.draw(this.data, this.meanOptions);
    }
  }

  ngOnInit(): void {
    this.turmaId = this.turmaService.getAcessId();
    this.turmaService.updateTurmas();
    this.meanData[0][1] = 0;
    this.meanData[1][1] = 0;
    this.meanData[2][1] = 0;
    this.turmaService.getOnlyTurma(this.turmaId).subscribe(
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
        this.turma = nt;
        this.metas = this.turma.metasLista;
        this.alunos = this.turma.alunoLista.alunos;
        for (let a of this.alunos) {
          this.turmaService.getMetasOf(this.turma.id, a).subscribe(
            metas => {
              for (let m of metas) {
                a.metas.set(m[0], m[1]);
              }
              this.setGraphOption("");
            },
            msg => {console.log(msg.message);}
          );
        }
        this.setGraphOption("");
      },
      msg => { alert(msg.message);}
    );
  }

}
