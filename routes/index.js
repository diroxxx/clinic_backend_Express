const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const vetController = require('../controllers/vetController');

const cors = require('cors');
router.use(cors());

router.get('/api/animalTypes', userController.getAnimalTypes);
router.get('/api/infoAboutServices', userController.getServicesInfo);
router.post('/api/login', loginController.login);
router.post('/api/reservation', clientController.addReservation);
router.get('/api/vets', vetController.getAllVets);
router.get('/api/animals/:clientId', clientController.getAnimals);
router.get('/api/appointments/:clientId', clientController.getAppointments);
router.post('/api/clients/animals/add', clientController.addAnimalByClientId);
router.get('/api/articles', userController.getArticles);
router.post('/api/register', loginController.register);
router.get('/api/vets/:id/appointments', vetController.getVetAppointments)
router.get('/api/users/:id/info/:userVet', userController.getUserInfo)
router.post('/api/users/changeInfo', userController.changeInfo);
router.put('/api/appointment/:id/:status', vetController.updateApp);
router.put('/api/appointment/changeDate/:id/:newDate', vetController.changeDateApp);
router.get('/api/vet/:id/articles', vetController.getArticlesByVetId);
router.put('/api/vet/article/:id', vetController.changeArticle);
router.post('/api/vet/article', vetController.addArticle);
router.delete('/api/vet/article/:articleId', vetController.deleteArticle);
router.put('/api/appointments/status/:date', vetController.updateAppStatus);


module.exports = router;
