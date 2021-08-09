import express = require('express');
import { CadastroDeTurmas } from './cadastroDeTurmas';

var taserver = express();

var cadastro: CadastroDeTurmas = new CadastroDeTurmas();

taserver.get('/', function (req, res) {
  res.send(cadastro.getTurmas());
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})