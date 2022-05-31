var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/aluno');
const aluno = require('../models/aluno');

router.get('/alunos', function(req,res){
  if(req.query['groupBy'] != undefined){
    if(req.query['groupBy'] == 'curso'){
      Aluno.listar()
      .then(dados => {
        cursos = {}
        dados.forEach(c => {
          if(cursos[c.curso] == undefined){
            cursos[c.curso] = 1
          }
          else {
            cursos[c.curso] += 1
          }
        })
        res.status(200).jsonp(cursos)
      })
      .catch( e => {
        res.status(500).jsonp({erro : e})
      })
  }
  if(req.query['groupBy'] == 'projeto'){
    Aluno.listar()
    .then(dados => {
      notas = {}
      dados.forEach(n => {
        if(notas[n.projeto] == undefined){
          notas[n.projeto] = 1
        }
        else {
          notas[n.projeto] += 1
        }
      })
      res.status(200).jsonp(notas)
    })
    .catch( e => {
      res.status(500).jsonp({erro : e})
    })
}
  else if(req.query['groupBy'] == 'recurso'){
    Aluno.listarRecurso()
    .then(dados => {
      var lista = []
      var filtro = /'recurso'/
      dados.forEach(n => {
        //Alternativa se der import com o jsonArray e o schema do bond
        console.log(n.exames['recurso'])
        if(n.exames['recurso'] != undefined){
          lista.push(n)
        }
        /*
        //Alternativa se der import do mongo com o alunos_mongo
        var check = JSON.stringify(n.exames)
        var sol = check.match(filtro)
        if(sol){
          lista.push(n.nome)
        }
        */
      })
     lista.sort()
     res.status(200).jsonp(lista)
    })
    .catch( e => {
      res.status(500).jsonp({erro : e})
    })
  }
}
  else if(req.query['curso'] != undefined){
    Aluno.listarPorCurso(req.query['curso'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else{
    Aluno.listar()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch( e => {
      res.status(503).jsonp({erro : e})
    })
  }
})


router.get('/alunos/tpc', function(req,res){
  Aluno.listarTPC()
  .then(dados => {
    var alunos = {}
    dados.forEach(d => {
      console.log(d.tpc)
      var total = d.tpc.length
      alunos[d.idAluno] = {curso: d.curso, Ntpc: total}
    })
    res.status(200).jsonp(alunos)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})

router.get('/alunos/:id', function(req,res){
  Aluno.lookUp(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


module.exports = router;
