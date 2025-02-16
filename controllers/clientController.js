const appointment = require('../models/Appointment')
const animal = require('../models/Animal')
const client = require('../models/Client')


const clientController = {

    addReservation: async (req, res) => {
        const {vetId, clientId, serviceId, animalId, appointmentDate, description, status} = req.body;
         const isAppAdded = await appointment.addAppointment(vetId, clientId, serviceId, animalId, appointmentDate, description, status)
        // console.log(vetId)
        if (isAppAdded) {
            res.status(201).json({message: 'Appointment added successfully.'})
        } else {
            res.status(400).json({message: 'Appointment added failed'})
        }
    },
    getAnimals: async (req, res) => {
        const { clientId } = req.params;
        const animals = await animal.getAnimalByClientId(clientId);
        res.status(200).json(animals);
    },
    getAppointments: async (req, res) => {
        const { clientId } = req.params;
        const appointments = await appointment.getAppointmentByClientId(clientId);
        // console.log(appointments);
        res.status(200).json(appointments);
    },

    addAnimalByClientId: async (req, res) => {
        const {clientId, name, typeId} = req.body;
        const addedAnimal = await animal.addAnimal(clientId, name, typeId);

        if (addedAnimal) {
            res.status(201).json({message : " animal added successfully"});
        } else {
            res.status(400).json({message : " animal not added"});
        }
    }
}
module.exports = clientController