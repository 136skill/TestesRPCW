var express = require('express');
var router = express.Router();
var Casamento = require('../controllers/casamento');
const casamento = require('../models/casamento');

/* GET home page. */
router.get('/casamentos', function(req, res, next) {
  if(req.query['byAno'] != undefined && req.query['byAno'] == "true"){
    Casamento.listar()
     .then(dados => {
       var final = {}
       dados.forEach( d => {
        var filtro = /(\d+)\//
        var r = d.date.match(filtro)
         if(final[r[1]] == undefined){
           final[r[1]] = []
         }
         else{
            final[r[1]].push(d)
         }
       })
       res.status(200).jsonp(final)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else if(req.query['nome'] != undefined){
    Casamento.listarPorNome(req.query['nome'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else if(req.query['ano'] != undefined) {
    //Alternativa 1:
    /*Casamento.listarPorAno(req.query['ano'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })*/
     //Alternativa 2:
     Casamento.listar()
     .then(dados => {
       var casamentos = []
       dados.forEach( d => {
         var filtro = /(\d+)\//
         var r = d.date.match(filtro)

         if (r[1] == req.query['ano']){
          casamentos.push(d)
         }
       })
       res.status(200).jsonp(casamentos)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else {
  Casamento.listar()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch( e => {
      res.status(503).jsonp({erro : e})
    })
  }
});

router.get('/casamentos/noivos', function(req, res, next) {
  Casamento.listar()
    .then(dados => {
      var noivos = []
      dados.forEach( d => {
        var filtro = /n.º\s\d+:\s([a-zA-ZéÁáâêíóçúã\s]+)\sc/
        var r = d.title.match(filtro)
        
        if (r){
          noivos.push({noivo:r[1], id: d._id})
        }
      })
      res.status(200).jsonp(noivos)
    })
    .catch( e => {
      res.status(507).jsonp({erro : e})
    })
});

router.get('/casamentos/:id', function(req, res, next) {
  cas = req.params.id
  Casamento.lookUp(cas)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch( e => {
      res.status(503).jsonp({erro : e})
    })
});

module.exports = router;
