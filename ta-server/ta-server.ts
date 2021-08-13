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

taserver.get('/turma/idlivre', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getIdLivre()));
})

taserver.get('/turmas', function (req: express.Request, res: express.Response) {
  console.log("Get req:");
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

taserver.get('/turma/:id/metas/:cpf', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum = parseInt(id);
  var cpf: string = <string> req.params.cpf;
  var metas: [string,string][] = [];
  var turma: Turma = cadastro.getOnlyTurma(idNum);
  var aluno: Aluno = turma.alunoLista.getAluno(cpf);
  console.log("Get req:");
  for (let m of aluno.metas) {
    metas.push(m);
  }
  console.log(metas);
  res.send(JSON.stringify(metas));
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
  var as: Aluno[] = <Aluno[]> req.body;
  var alunos: Aluno[] = [];
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

taserver.put('/turma/:id/aluno', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum: number = parseInt(id);
  var a: Aluno = <Aluno> req.body.newAluno;
  var ms: [string, string][] = <[string, string][]> req.body.metas;
  console.log(req.body);
  console.log(a);
  console.log(ms);
  var aluno: Aluno = new Aluno();
  aluno.nome = a.nome;
  aluno.cpf = a.cpf;
  aluno.email = a.email;
  aluno.github = a.github;
  for (let m in ms){
    var chave: string = m[0];
    var valor: string = m[1];
    aluno.metas.set(chave, valor);
  }
  
  var result: Aluno = cadastro.inserirAluno(idNum, aluno);
  if (result) {
    res.send({"success": "O aluno novo pôde ser inserido com sucesso"});
  } else {
    res.send({"failure": "O aluno novo não pôde ser inserido"});
  }
})

taserver.put('/turma/:id/:cpf/aluno', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum: number = parseInt(id);
  var delCpf: string = req.params.cpf;
  
  var result: Aluno = cadastro.deletarAluno(idNum, delCpf);
  if (result) {
    res.send({"success": "O aluno pôde ser deletado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pôde ser deletado"});
  }
})

taserver.put('/turma/:id/metas', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  var idNum: number = parseInt(id);
  var metas: string [] = <string []> req.body;
  var turma: Turma = cadastro.atualizarMetas(idNum, metas);
  if (turma) {
    res.send({"success": "A turma teve o cadastro de metas atualizado com sucesso"});
  } else {
    res.send({"failure": "A turma não pôde atualizar o cadastro de metas"});
  }
})

taserver.put('/turma/:id/:cpf/metas', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  console.log("Server Put -> Id:" + id);
  var idNum: number = parseInt(id);
  var cpf: string = <string> req.params.cpf;
  console.log("Server Put -> CPF:" + cpf);
  var metas: Map<string, string> = <Map<string, string>> req.body;
  console.log(metas);
  var turma: Turma = cadastro.atualizarMetasUmAluno(idNum, cpf, metas);
  if (turma) {
    res.send({"success": "O aluno teve as notas atualizadas com sucesso"});
  } else {
    res.send({"failure": "O aluno não pôde ter as notas atualizadas"});
  }
})

taserver.put('/turma/:id/metas/:cpf', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.id;
  console.log(id);
  var idNum: number = parseInt(id);
  var cpf: string = <string> req.params.cpf;
  console.log(cpf);
  var metas: [string, string][] = <[string, string][]> req.body;
  console.log("Put req:");
  var turma: Turma = cadastro.getTurmas()[cadastro.findIndexById(idNum)];
  var aluno: Aluno = turma.alunoLista.getAluno(cpf);
  console.log(aluno);
  console.log(metas);
  for (let i of metas) {
    console.log(i[0] + " => " + i[1]);
    aluno.metas.set(i[0], i[1]);
  }
  var turma: Turma = cadastro.atualizarAluno(idNum, aluno);
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