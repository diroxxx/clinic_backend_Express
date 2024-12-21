const animal = require("../models/Animal");
const service = require("../models/Appointment");
const client = require("../models/Client");
const vet = require("../models/Vet");


const guestController = {

    getAnimalTypes: async (req, res) => {
        const animalTypes = await animal.getAnimalTypes();
        res.status(200).json(animalTypes);
    },
    getServicesInfo: async (req, res) => {
        const types = await service.getTypesOfServices();
        res.status(200).json(types);
    },

    getArticles: async (req, res) => {
        // const articles = await  client.getArticles();
        const articles = await  client.getArticles();
        if (articles.length > 0) {
            res.status(200).json(articles);
        } else {
            res.status(404).json({message: 'No articles found.'});
        }
    },

    getUserInfo: async (req, res) => {
        const { id, userVet } = req.params;
        console.log(id, userVet);
        if (userVet === 'false'){
            const clientInfo = await client.getUserInfo(id);
            console.log("fsdfsdfsfs");
           return  res.status(200).json(clientInfo);
        } else {
            console.log("aaaaaaaaaaaaaaaaaaaa");
            const vetInfo = await vet.getVetInfo(id);
          return   res.status(200).json(vetInfo);
        }

    }






}
module.exports = guestController;