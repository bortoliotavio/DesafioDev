var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    if (req.session.user) {
        console.log(req.session.user);
        res.redirect('product');
    } else {
        res.render('register', {
            layout: false,
            habilitaAlert: false
        });
    }
});

router.post('/', (req, res) => {
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const registrar = async () => {
        try {
            const resultado = await userController.registrarUsuario(user);
            if (resultado.value === true) {
                res.render('login', {
                    layout: false,
                    habilitaAlert: true,
                    message: resultado.message,
                    classe: "success"
                })
            } else {
                res.render('register', {
                    layout: false,
                    habilitaAlert: true,
                    message: resultado.message,
                    classe: "danger"
                })
            }
        } catch (erro) {

        }
    }

    registrar();

})

module.exports = router;
