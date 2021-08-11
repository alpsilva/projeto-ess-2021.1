import express = require('express');
import bodyParser = require("body-parser");

import { Turma } from '../commons/turma';
import { CadastroDeTurmas } from './cadastroDeTurmas';
import { Aluno } from '../commons/aluno';

var taserver = express();

var cadastro: CadastroDeTurmas = new CadastroDeTurmas();

/*
var teste: Turma = new Turma();
teste.nome = "TesteServer1";
teste.descricao = "Essa é uma turma para testar o get do servidor.";
cadastro.criar(teste);
*/

var allowCrossDomain = function(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getTurmas()));
})

taserver.get('/turmas', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getTurmas()));
})

taserver.get('/turma/:id', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum = parseInt(id);
  res.send(JSON.stringify(cadastro.getOnlyTurma(idNum)));
})

taserver.get('/turma/:id/alunos', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum = parseInt(id);
  res.send(JSON.stringify(cadastro.getOnlyTurma(idNum).getAlunos()));
})

taserver.get('/turma/:id/metas', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum = parseInt(id);
  res.send(JSON.stringify(cadastro.getOnlyTurma(idNum).getMetas()));
})

taserver.post('/turma', function (req: express.Request, res: express.Response) {
  var turma: Turma = <Turma> req.body; //verificar se é mesmo Turma!
  var aux: Turma = new Turma();
  aux.nome = turma.nome;
  aux.descricao = turma.descricao;
  aux = cadastro.criar(aux);
  if (aux) {
    res.send({"success": "A turma foi cadastrada com sucesso"});
  } else {
    res.send({"failure": "A turma não pode ser cadastrada"});
  }
})

taserver.put('/turma', function (req: express.Request, res: express.Response) {
  var aux: Turma = <Turma> req.body;
  var turma: Turma = new Turma();
  turma.nome = aux.nome;
  turma.descricao = aux.descricao;
  turma.id = aux.id;
  for (let meta of aux.metasLista) {
    turma.insertMeta(meta);
  }
  for (let a of aux.alunoLista.alunos){
    var aluno: Aluno = new Aluno();
    aluno.nome = a.nome;
    aluno.cpf = a.cpf;
    aluno.email = a.email;
    aluno.github = a.github;
    for(var value in a.metas){
      aluno.metas.set(value, a.metas[value]);
    }
    turma.insertAluno(aluno);
  }
  /*
  for (let m of aux.metasLista){
    // insertMetas precisa ser atributo de turma
  }
  */
  turma = cadastro.atualizar(turma);
  if (turma) {
    res.send({"success": "A turma foi atualizada com sucesso"});
  } else {
    res.send({"failure": "A turma não pode ser atualizada"});
  }
})

taserver.put('/turma/:id/alunos', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum: number = parseInt(id);
  var as: Array<Aluno> = <Array<Aluno>> req.body;
  var alunos: Array<Aluno> = new Array<Aluno>();
  for (let a of as){
    var aluno: Aluno = new Aluno();
    aluno.nome = a.nome;
    aluno.cpf = a.cpf;
    aluno.email = a.email;
    aluno.github = a.github;
    for(var value in a.metas){
      aluno.metas.set(value, a.metas[value]);
    }
    alunos.push(aluno);
  }
  var turma: Turma = cadastro.atualizarAlunos(idNum, alunos);
  if (turma) {
    res.send({"success": "A turma teve o cadastro de alunos atualizado com sucesso"});
  } else {
    res.send({"failure": "A turma não pôde atualizar o cadastro de alunos"});
  }
})

taserver.put('/turma/:id/metas', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum: number = parseInt(id);
  var metas: Array<string> = <Array<string>> req.body;
  var turma: Turma = cadastro.atualizarMetas(idNum, metas);
  if (turma) {
    res.send({"success": "A turma teve o cadastro de metas atualizado com sucesso"});
  } else {
    res.send({"failure": "A turma não pôde atualizar o cadastro de metas"});
  }
})

taserver.put('/turma/:id/:cpf/metas', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum: number = parseInt(id);
  var cpf: string = <string> req.params.cpf;
  console.log(req.body);
  var metas: Map<string, string> = <Map<string, string>> req.body;
  console.log(metas);
  var turma: Turma = cadastro.atualizarMetasUmAluno(idNum, cpf, metas);
  if (turma) {
    res.send({"success": "O aluno teve as notas atualizadas com sucesso"});
  } else {
    res.send({"failure": "O aluno não pôde ter as notas atualizadas"});
  }
})

taserver.delete('/turma/:id', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum: number = parseInt(id);
  var turma: Turma = cadastro.deletar(idNum);
  if (turma) {
    res.send({"success": "A turma foi deletada com sucesso"});
  } else {
    res.send({"failure": "A turma não pode ser deletada"});
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})