const appointment = require('../models/Appointment')
const animal = require('../models/Animal')


const clientController = {

    addReservation: async (req, res) => {
        const {vetId, clientId, serviceId, animalId, appointmentDate, description, status} = req.body;
         const isAppAdded = await appointment.addAppointment(vetId, clientId, serviceId, animalId, appointmentDate, description, status)

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
        const [appointments] = await appointment.getAppointmentByClientId(clientId);
        res.status(200).json(appointments);
    }




}
module.exports = clientController