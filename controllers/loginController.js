const vet = require('../models/Vet')
const client = require('../models/Client')

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
            }
        } else {
            const isClientExist = await client.doesClientExist(email, password);
            if (isClientExist){
                loggedUser.id = isClientExist.id;

            }
        }
        res.status(200).json(loggedUser)
    }


}
module.exports = loginController