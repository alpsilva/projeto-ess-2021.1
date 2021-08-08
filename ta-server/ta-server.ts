import express = require('express');

var taserver = express();

var turmas = [{nome:'Turma 1',descricao:'Turma Teste 1',id:'1',alunoLista:{}}];

taserver.get('/', function (req, res) {
  res.send(turmas);
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})