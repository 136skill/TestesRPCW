var express = require('express');
var router = express.Router();
var Filme = require('../controllers/filme');
const filme = require('../models/filme');

router.get('/filmes', function(req,res){
  if(req.query['by'] != undefined){
    if(req.query['by'] == "ator"){
      Filme.listar2(req.query['by'])
        .then(dados => {
          var final = {}
          dados.forEach( d => {
            d.cast.forEach( c => {
              if(final[c] == undefined){
                final[c] = [d.title]
              }
              else{
                final[c].push(d.title)
              }
            })
          })
        res.status(200).jsonp(final)
        })
      .catch( e => {
    res.status(503).jsonp({erro : e})
  })
}
    else if(req.query['by'] == "genero"){
      Filme.listar3()
      .then(dados => {
        var gen = {}
        dados.forEach(d => {
          d.genres.forEach( c => {
            if(gen[c] == undefined){
              gen[c] = [d.title]
            }
            else {
              gen[c].push(d.title)
            }
          })
        })
        res.status(200).jsonp(gen)
      })
      .catch( e => {
        res.status(503).jsonp({erro : e})
      })
  }
  else {
  Filme.listar1()
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
  }
}
})



router.get('/filmesQuantAtor', function(req,res){
  Filme.listar()
  .then(dados => {
    var fim = []
    dados.forEach( d => {
      fim.push({titulo: d.title, partipantes: d.cast.length})
    })
    res.status(200).jsonp(fim)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


router.get('/filmes/:id', function(req,res){
  Filme.lookUp(req.params.id)
  .then(dados => {
    console.log(dados)
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/atores', function(req,res){
  Filme.listar2()
  .then(dados => {
    var actor = []
    dados.forEach( d => {
      d.cast.forEach( c => {
        if(!actor.includes(c)){
          actor.push(c)
        }
      })
    })
    res.status(200).jsonp(actor)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


module.exports = router;
