const express = require('express');
const router = express.Router();
const clientRepository = require('../controllers/clientController');
const guestController = require('../controllers/guestController');
const loginController = require('../controllers/loginController');

const cors = require('cors');
router.use(cors());

router.get('/api/animalTypes', guestController.getAnimalTypes);
router.get('/api/infoAboutServices', guestController.getServicesInfo);
router.post('/api/login', loginController.login);


module.exports = router;
