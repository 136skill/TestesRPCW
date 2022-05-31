var express = require('express');
var router = express.Router();
var Premio = require('../controllers/premio');
const premio = require('../models/premio');

router.get('/premios', function(req,res){
  if(req.query['categoria'] != undefined && req.query['data'] != undefined ){
    Premio.listarPorCategoria(req.query['categoria'])
     .then(dados => {
       var lista = []
       dados.forEach( d => {
         if(d.year == req.query['data']){
           lista.push(d)
         }
       })
       res.status(200).jsonp(lista)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else if(req.query['categoria'] != undefined){
    Premio.listarPorCategoria(req.query['categoria'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else {
  Premio.listar1()
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
}
})


router.get('/categorias', function(req,res){
  Premio.listar2()
  .then(dados => {
    var final = []
    dados.forEach(c => {
      if(!final.includes(c.category)){
        final.push(c.category)
      }
    })
    res.status(200).jsonp(final)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/laureados', function(req,res){
  Premio.listar()
  .then(dados => {
    var final = {}
    dados.forEach(d=>{
      d.laureates.forEach(c => {
          if(final[c.firstname]!=undefined){
          final[c.firstname].push({nome:c.firstname,ano:d.year, categoria:d.category})
          }
          else {
            final[c.firstname]= [{nome:c.firstname,ano:d.year, categoria:d.category}]
          }
        
        }
      )
    })
    res.status(200).jsonp(final)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


router.get('/premios/:id', function(req,res){
  Premio.lookUp(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


module.exports = router;
