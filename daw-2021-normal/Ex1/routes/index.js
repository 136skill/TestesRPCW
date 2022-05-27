var express = require('express');
var router = express.Router();
var Batismo = require('../controllers/batismo');
const batismo = require('../models/batismo');


router.get('/batismos', function(req,res){
  if(req.query['ano'] != undefined){
    Batismo.listarPorAno(req.query['ano'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else{
    Batismo.listar()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch( e => {
      res.status(503).jsonp({erro : e})
    })
}
})

router.get('/batismos/progenitores', function(req,res){
  Batismo.listarProg()
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/batismos/stats', function(req,res){
  Batismo.listar()
  .then(dados => {
    filtroData = /^(\d+)/
    resultado = {}
    dados.forEach( b => {
      var sol = b.date.match(filtroData)
      if(resultado[sol[0]] != undefined){
        resultado[sol[0]] += 1
      }
      else{
        resultado[sol[0]] = 0
      }
    })
    res.status(200).jsonp(resultado)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/batismos/batisado', function(req,res){
  Batismo.listar()
  .then(dados => {
    var lista = []
    var filtro = /n.º\s\d:\s([a-zA-ZâáéíóÂ]+)./
    dados.forEach(b => {
      var nomes = b.title.match(filtro)
      if(nomes != null){
        lista.push({batisado: nomes[1]})
      }
    })
    lista.sort()
    res.status(200).jsonp(lista)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/batismos/:id', function(req,res){
  Batismo.lookUp(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})



module.exports = router;
