import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../commons/turma';
import { Aluno } from '../../../../commons/aluno';
import { TurmaService } from '../turmas/turmas.service';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType } from 'angular-google-charts';

declare var google: any;

@Component({
  selector: 'app-perf-report',
  templateUrl: './perf-report.component.html',
  styleUrls: ['./perf-report.component.css']
})
export class PerfReportComponent implements OnInit {
  
  constructor(private turmaService: TurmaService) { }
  
  turmaId: number = 1;
  turma: Turma = new Turma();
  
  alunos: Aluno[] = [];
  metas: string[] = [];
  
  meanTitle = "MeanChart: "; 
  meanType = ChartType.PieChart;
  meanData: [string, number][] = [
    ["Aprovado", 0],
    ["Aluno na Final", 0],
    ["Reprovado", 0]
  ];
  meanCollumns: string[] = ["Nota", "Quantidade de Alunos"];
  meanOptions: {
    colors: ['#0afb07','#fbec01','#fb0401'],
    is3D: false
  }

  data: google.visualization.DataTable;
  chart: google.visualization.PieChart;

  onMove() {
    this.updateChart();
  }
  
  updateChart() {
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

    this.chart = new google.visualization.PieChart(document.getElementById('meanChart'));

    this.chart.draw(this.data, {
      title: this.meanTitle,
      width: 400,
      height: 300,
      colors: ['#0afb07','#fbec01','#fb0401'],
      is3D: false
    });
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
            },
            msg => {console.log(msg.message);}
          );
        }
      },
      msg => { alert(msg.message);}
    );
  }

}
