var express = require('express');
var router = express.Router();

var categoryController = require('./../controllers/categoryController');

router.get('/', (req, res) => {
  if(req.session.user){ 
    const listar = async () => {
      try {
        const listaCategorias = await categoryController.listarCategorias();
        console.log(listaCategorias);
        res.render('category', {
          layout: 'logged',
          categorias: listaCategorias
        });
      }
      catch (err) {
        console.log(err);
      }
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

router.post('/', (req, res) => {
  if(req.session.user){
    console.log(req.body);
    console.log(req.session.user);
    const category = {
      name: req.body.name,
      //categorias: listaCategorias
    }
    const inserir = async () => {
      try{
        const resultado = await categoryController.cadastraCategoria(category);
        const listaCategorias = await categoryController.listarCategorias();
        res.render('category', {
          layout: 'logged',
          categorias: listaCategorias 
        });
        console.log(resultado);
      }
      catch (err) {
        console.log(err);
      }
    }
    inserir();
  }else{
    res.render('login', {
      layout: false,
      habilitarAlert: true,
      classe: 'danger',
      message: "Você precisa estar logado para acessar este recurso!"
    })
  }
})

router.delete('/', (req, res) => {
  if(req.session.user){
    console.log(req.body);
    console.log(req.session.user);
    const category = {
      id: req.body.id
    }
    const deleta = async () => {
      try{
        const resultado = await categoryController.deletaCategoria(category.id);
        const listaCategorias = await categoryController.listarCategorias();
        res.render('category', {
          layout: 'logged',
          categorias: listaCategorias 
        });
        console.log(resultado);
      }
      catch (err) {
        console.log(err);
      }
    }
    deleta();
  }else{
    res.render('login', {
      layout: false,
      habilitarAlert: true,
      classe: 'danger',
      message: "Você precisa estar logado para acessar este recurso!"
    })
  }
})

router.put('/', (req, res) => {
  if(req.session.user){
    console.log(req.body);
    console.log(req.session.user);
    const category = {
      id: req.body.id,
      name: req.body.name
    }
    const atualiza = async () => {
      try{
        const resultado = await categoryController.atualizaCategoria(category.id);
        const listaCategorias = await categoryController.listarCategorias();
        res.render('category', {
          layout: 'logged',
          categorias: listaCategorias 
        });
        console.log(resultado);
      }
      catch (err) {
        console.log(err);
      }
    }
    atualiza();
  }else{
    res.render('login', {
      layout: false,
      habilitarAlert: true,
      classe: 'danger',
      message: "Você precisa estar logado para acessar este recurso!"
    })
  }
})

module.exports = router;
