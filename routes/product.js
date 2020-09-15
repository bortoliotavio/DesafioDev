var express = require('express');
var router = express.Router();

var productController = require('./../controllers/productController');
var categoryController = require('./../controllers/categoryController');

router.get('/', (req, res) => {
  if(req.session.user){
    const listar = async () => {
      try {
        const listaCategorias = await categoryController.listarCategorias();
        const listaProdutos = await productController.listarProdutos();
        console.log(listaProdutos);
        res.render('product', {
          layout: 'logged',
          categorias: listaCategorias,
          produtos: listaProdutos
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
    const product = {
      name: req.body.name,
      category: req.body.category
    }
    const inserir = async () => {
      try{
        const resultado = await productController.cadastraProduto(product);
        const listaCategorias = await categoryController.listarCategorias();
        const listaProdutos = await productController.listarProdutos();
        res.render('product', {
          layout: 'logged',
          categorias: listaCategorias,
          produtos: listaProdutos
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
    const product = {
      id: req.body.id
    }
    const deleta = async () => {
      try{
        const resultado = await productController.deletaProduto(product.id);
        const listaProdutos = await productController.listarProdutos();
        res.render('product', {
          layout: 'logged',
          produtos: listaProdutos 
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


module.exports = router;
