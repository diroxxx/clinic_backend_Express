const animal = require("../models/Animal");
const service = require("../models/Appointment");
const client = require("../models/Client");
const vet = require("../models/Vet");
const user = require("../models/User");


const userController = {

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
            // console.log("fsdfsdfsfs");
           return  res.status(200).json(clientInfo);
        } else {
            // console.log("aaaaaaaaaaaaaaaaaaaa");
            const vetInfo = await vet.getVetInfo(id);
          return   res.status(200).json(vetInfo);
        }
    },

    changeInfo: async (req, res) => {
        const {userId,
            isUserVet,
            firstName,
            lastName,
            email,
            phoneNumber,
            password} = req.body;
        console.log(isUserVet);

        let userToChange = undefined;

        if (isUserVet){
            userToChange = await vet.getVetInfo(userId);
        } else if (isUserVet === false){
            userToChange = await client.getUserInfo(userId);
        }
        if (userToChange === undefined) {
            return res.status(403).json({message: 'No user found.'});
        }
        // console.log(userToChange);
        if (firstName !== '' && firstName !== userToChange.first_name) {
            userToChange.first_name = firstName;
        }
        if (lastName && lastName !== userToChange.last_name) {
            userToChange.last_name = lastName;
        }
        if (email && email !== userToChange.email) {
            userToChange.email = email;
        }
        if (phoneNumber && phoneNumber !== userToChange.phone_number ) {
            userToChange.phone_number = phoneNumber;
        }
        if (password && password !== userToChange.password ) {
            userToChange.password = password;
        }
        const updatedUser = await user.updateUser(userId,userToChange, isUserVet);
        console.log(updatedUser)
        if (updatedUser) {
            res.status(200).json({message: "User updated successfully."});
        } else {
            res.status(404).json({message: 'User updated unsuccessfully.'});
        }

    }






}
module.exports = userController;