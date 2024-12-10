const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
const guestController = require('../controllers/guestController');
const loginController = require('../controllers/loginController');
const vetController = require('../controllers/vetController');

const cors = require('cors');
router.use(cors());

router.get('/api/animalTypes', guestController.getAnimalTypes);
router.get('/api/infoAboutServices', guestController.getServicesInfo);
router.post('/api/login', loginController.login);
router.post('/api/reservation', clientController.addReservation);
router.get('/api/vets', vetController.getAllVets);
router.get('/api/animals/:clientId', clientController.getAnimals);
router.get('/api/appointments/:clientId', clientController.getAppointments);


module.exports = router;
