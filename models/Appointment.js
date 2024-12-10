const db = require('../MyDatabase');

const Appointment = {

    getTypesOfServices: async () => {
        const [types] = await db.query('SELECT * FROM service');
        return types;
    },
    addAppointment: async (vetId, clientId, serviceId, animalId, appointmentDate, description, status) => {
        const [rows] = await db.query('INSERT INTO `appointment`(`ap_date`, `description`, `status`, `vet_id`, `service_id`, `client_id`, `animal_id`)' +
            ' VALUES (?,?,?,?,?,?,?)', [appointmentDate, description, status, vetId, serviceId, clientId, animalId]);
        return rows;
    },

    getAppointmentByClientId: async (clientId) => {
        const [rows] = await db.query(
            'SELECT appointment.id,animal.name as animalName, service.name, appointment.ap_date as date, appointment.status, CONCAT(user.first_name, " ", user.last_name) AS vetName, service.price, service.name ' +
            'FROM appointment ' +
            'JOIN client ON client.id = appointment.client_id ' +
            'JOIN vet ON vet.id = appointment.vet_id ' +
            'JOIN user ON vet.id = user.id ' +
            'JOIN service ON service.id = appointment.service_id ' +
            'JOIN animal ON animal.id = appointment.animal_id ' +
            'WHERE client.id = ?',
            [clientId]
        );
        return rows;
    }








}
module.exports = Appointment