const vet = require('../models/Vet')
const client = require('../models/Client')
const guest = require('../models/User')

const loginController = {

    login: async (req, res) => {
        const { role, email, password } = req.body;

        let loggedUser = {id: 0, userVet: false}

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (role === 'vet'){
            const isVetExist = await vet.doesVetExist(email, password);
            if (isVetExist){
                loggedUser.id = isVetExist.id;
                loggedUser.userVet = true;
            } else {
             return res.status(400).json({ message: "Vet doesn't exist with given email and password" });
            }
        } else {
            const isClientExist = await client.doesClientExist(email, password);
            if (isClientExist){
                loggedUser.id = isClientExist.id;
            } else {
               return  res.status(400).json({ message: "Client doesn't exist with given email and password" });
            }
        }
      return   res.status(200).json(loggedUser)
    },

    register: async (req, res) => {
        const {  firstName, lastName , email , phoneNumber , password, role } = req.body;
        const doesUserExist = await guest.doesUserExist(email);

        if (doesUserExist.length > 0){
          return   res.status(400).json({ message: "User already exists with given email" });
        } else {
            const addedUser = await guest.addUser(firstName, lastName , email , phoneNumber , password, role );
            if (addedUser.length === 0){
                return res.status(400).json({ message: "Failed to add user" });
            }
          return   res.status(201).json(doesUserExist);
        }
    }
}
module.exports = loginController