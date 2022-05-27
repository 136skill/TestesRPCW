var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor');
const compositor = require('../models/compositor');

router.get('/compositores', function(req,res){
  if(req.query['data'] != undefined && req.query['periodo'] != undefined){
    Compositor.listarPorPeriodo(req.query['periodo'])
     .then(dados => {
       var final = []
       dados.forEach(d => {
         if(d.dataNasc){
          ano = JSON.stringify(d.dataNasc)
          var x = ano.substring(1,5)
          if(x){
            if(x == req.query['data']){
              final.push(d)
         }}}
       })
       res.status(200).jsonp(final)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else if(req.query['periodo'] != undefined){
    Compositor.listarPorPeriodo(req.query['periodo'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else{
  Compositor.listar()
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })}
})


router.get('/compositores/:id', function(req,res){
  Compositor.lookUp(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

module.exports = router;
