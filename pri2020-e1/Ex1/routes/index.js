var express = require('express');
var router = express.Router();
var Pub = require('../controllers/jcrpub');
const pub = require('../models/jcrpub');

router.get('/pubs', function(req,res){
  if(req.query['type'] != undefined && req.query['year'] != undefined){
    Pub.listarPorTipo(req.query['type'])
     .then(dados => {
       resultados = []
       dados.forEach(d => {
         if(d.year >= req.query['year']){
            resultados.push({d})
         }
       })
       res.status(200).jsonp(resultados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else if(req.query['autor'] != undefined){
    Pub.listarAutoresP()
      .then(dados => {
        var final = []
        dados.forEach( d => {
          d.authors.forEach( x => {
            if(x == req.query['autor']){
              final.push(d.title)
        }
      })
    })
       res.status(200).jsonp(final)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else if(req.query['type'] != undefined){
    Pub.listarPorTipo(req.query['type'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else{
    Pub.listar()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch( e => {
      res.status(503).jsonp({erro : e})
    })
  }
})

router.get('/types', function(req,res){
  Pub.listar()
  .then(dados => {
    var lista = []
    dados.forEach(b => {
      var tipo = b.type
      if(!lista.includes(tipo)){
        lista.push(tipo)
      }
    })
    lista.sort()
    res.status(200).jsonp(lista)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/autores', function(req,res){
  Pub.listarAutores()
  .then(dados => {
    autores = []
    dados.forEach( d => {
      d.authors.forEach( x => {
        if(!autores.includes(x)){
          autores.push(x)
        }
      })
    })
    res.status(200).jsonp(autores)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


router.get('/pubs/:id', function(req,res){
  Pub.lookUp(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

module.exports = router;
