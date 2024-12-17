const vet = require("../models/Vet")
const appointment = require("../models/Appointment")

const vetController = {
    getAllVets: async (req, res) => {
        const vets = await vet.getVets();
        console.log(vets)
        res.status(200).json(vets);
    },

    getVetAppointments: async (req, res) => {
        const {id} = req.params;
        const appointments = await  appointment.getAppointmentByVetId(id);
        res.status(200).json(appointments);

    }
}
module.exports = vetController;