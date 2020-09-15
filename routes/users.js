var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  if(req.session.user){
    listar = async () => {
      const resultado = await userController.listarUsuarios();
      const vetorResultado = Array.from(resultado);
      let users = []
      vetorResultado.map(user => {
        users.push({
          id: user.id,
          name: user.name,
          email: user.email
        })
      })
      console.log(users);
      res.render('users', {
        layout: 'logged',
        users: users
      });
    }
    listar();
  }else{
    res.render('login', {
      layout: false,
      habilitarAlert: true,
      classe: 'danger',
      message: "Você precisa estar logado para acessar este recurso!"
    })
  }
});

module.exports = router;
