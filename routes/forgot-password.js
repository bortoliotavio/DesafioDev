var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('forgot-password', {layout: false});
});

module.exports = router;
