const express = require('express');
const router = express.Router();
const clientRepository = require('/controllers/clientController');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/animals')


module.exports = router;
