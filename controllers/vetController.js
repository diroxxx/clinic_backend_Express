const vet = require("../models/Vet")

const vetController = {
    getAllVets: async (req, res) => {
        const vets = await vet.getVets();
        res.status(200).json(vets);
    }
}
module.exports = vetController;