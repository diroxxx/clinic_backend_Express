const animal = require("../models/Animal");
const service = require("../models/Appointment");
const client = require("../models/Client");


const guestController = {

    getAnimalTypes: async (req, res) => {

        const animalTypes = await animal.getAnimalTypes();

        // if (animalTypes.length > 0) {
        //     res.status(200).json(animalTypes);
        // } else {
        //     res.status(404).json({"message": "Not Found"});
        // }
        res.status(200).json(animalTypes);


        // try {
        //     const animalTypes = await animal.getAnimalTypes();
        //     if (animalTypes.length > 0) {
        //         res.status(200).json(animalTypes);
        //     } else {
        //         res.status(404).json({ message: "No animal types found" });
        //     }
        // } catch (error) {
        //     res.status(500).json({ message: "Internal Server Error", error });
        // }
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
    }






}
module.exports = guestController;