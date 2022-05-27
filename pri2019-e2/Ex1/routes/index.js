var express = require('express');
var router = express.Router();
var Filme = require('../controllers/filme');
const filme = require('../models/filme');

router.get('/filmes', function(req,res){
  if(req.query['categoria'] != undefined && req.query['data'] != undefined){
    Filme.listarPorAno(req.query['data'])
     .then(dados => {
      var final = []
      dados.forEach( d => {
        d.genres.forEach( g => {
          if(g == req.query['categoria']){
            final.push({Filme: d.title, Data: d.year})
          }
        })
      })
       res.status(200).jsonp(final)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else if(req.query['genro'] != undefined){
    Filme.listar()
     .then(dados => {
       var final = []
       dados.forEach( d => {
         d.genres.forEach( g => {
           if(g == req.query['genro']){
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
  else{
    Filme.listar()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch( e => {
      res.status(503).jsonp({erro : e})
    })
  }
})



router.get('/generos', function(req,res){
  Filme.listar()
  .then(dados => {
    var gene = []
    dados.forEach( d => {
      d.genres.forEach( g => {
        if(!gene.includes(g)){
          gene.push(g)
        }
      })
      
    })
    res.status(200).jsonp(gene)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/atores', function(req,res){
  Filme.listar()
  .then(dados => {
    var ator = []
    dados.forEach( d => {
      d.cast.forEach( g => {
        if(!ator.includes(g)){
          ator.push(g)
        }
      })
      
    })
    res.status(200).jsonp(ator)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


router.get('/filmes/:id', function(req,res){
  Filme.lookUp2(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

module.exports = router;
