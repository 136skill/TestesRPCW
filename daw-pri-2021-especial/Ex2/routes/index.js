var express = require('express');
var router = express.Router();
var axios = require('axios');


apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY1MzM5MTc0NiwiZXhwIjoxNjU1OTgzNzQ2fQ.DxCI1zx_2Tq8tue_iDO3-bA8_IuDUVxcDSYzXMNplhDKzfLFtHX7Po4AVWPi6fYIcQ1KZ1KPoRT_svOQ89zuySPRg0wnKosDIWPRF2_YPJVZvw5wZn76mRD7wKRBciSRqpe8lzcRIVGIhifJ9Jk-KikKHhQx4W1OBqrWGanT2pOQoEDwyS55KrwXN7eabvRQn1J01mQ5c7e0sPqjcEQmoB8vM_u7c4MWAMjTFQFw_iAaI-N7wkUkoDAfLnY3HMY3zTMq23P0-AYD4_Jjl9-Gy0e8mEZAIIYmhd6vWLQG3CV3BLmU27khiXZ95nOk620kYD7BwPr5jz-JpF0eLavKaA"


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/legislacao?apikey=" + apikey)
    .then(response => {
      var lista = response.data
      //dados -> o nome que passa para o pug
      // lista -> o que se obtem da response
      res.render('index', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});

router.get('/:diploma', function(req, res, next) {
  al = req.params.diploma
  axios.get("http://clav-api.di.uminho.pt/v2/legislacao/" + al + "?info=completa&apikey=" + apikey)
    .then(response => {
      var lista = response.data
      //dados -> o nome que passa para o pug
      // lista -> o que se obtem da response
      res.render('diploma', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});

module.exports = router;
