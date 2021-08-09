import express = require('express');
import bodyParser = require("body-parser");

import { Turma } from '../commons/turma';
import { CadastroDeTurmas } from './cadastroDeTurmas';

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

taserver.get('/turmas', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getTurmas()));
})

taserver.post('/turma', function (req: express.Request, res: express.Response) {
  var turma: Turma = <Turma> req.body; //verificar se é mesmo Turma!
  var aux: Turma = new Turma();
  aux.nome = turma.nome;
  aux.descricao = turma.descricao;
  aux = cadastro.criar(aux);
  if (aux) {
    res.send({"success": "A turma " + aux.id + " foi cadastrada com sucesso"});
  } else {
    res.send({"failure": "A turma não pode ser cadastrada"});
  }
})

taserver.put('/turma', function (req: express.Request, res: express.Response) {
  var turma: Turma = <Turma> req.body;
  var aux: Turma = new Turma();
  aux.nome = turma.nome;
  aux.descricao = turma.descricao;
  aux.id = turma.id;
  aux = cadastro.atualizar(aux);
  if (aux) {
    res.send({"success": "A turma foi atualizada com sucesso"});
  } else {
    res.send({"failure": "A turma não pode ser atualizada"});
  }
})

taserver.delete('/turma/:id', function (req: express.Request, res: express.Response) {
  var id: string = <string> req.params.cpf;
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