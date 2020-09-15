var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  if(req.session.user){
    console.log(req.session.user);
    res.redirect('product');
  }else{
    res.render('login', {
      layout: false,
      habilitaAlert: false
    });
  }
});

router.get('/doLogout', (req, res) => {
    if(req.session.user){
      req.session.destroy(function(){
        res.render('login', {
          layout: false,
          habilitaAlert: true,
          message: "Logout realizado com sucesso",
          classe: 'success'
        })
      })
    }else{
      res.render('login', {
        layout: false,
        habilitaAlert: false
      })
    }
})

router.post('/doLogin', (req, res) => {
  console.log(req.body);
  let credentials = req.body;

  const logar = async () => {
    try{
      const resultado = await userController.logarUsuario(credentials);
      if(Array.from(resultado).length > 0){
        let user = {
          id: resultado[0].id,
          name: resultado[0].name,
          email: resultado[0].email,
          picture: resultado[0].picture
        }
        req.session.user = user;
        res.redirect('product');
      }else{
        res.render('login',{
          layout: false,
          habilitaAlert: true,
          message: "Erro no login!",
          classe: "danger"
        })
      }
    }catch(erro){
      console.log(erro);
    }
  }

  logar();
  
})

module.exports = router;
