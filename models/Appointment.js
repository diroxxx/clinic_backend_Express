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
            'SELECT appointment.id,animal.name as animalName, service.name, appointment.ap_date as date, appointment.status, CONCAT(user.first_name, " ", user.last_name) AS vetName, service.price ' +
            'FROM appointment ' +
            'JOIN client ON client.id = appointment.client_id ' +
            'JOIN vet ON vet.id = appointment.vet_id ' +
            'JOIN user ON vet.id = user.id ' +
            'JOIN service ON service.id = appointment.service_id ' +
            'JOIN animal ON animal.id = appointment.animal_id ' +
            'WHERE client.id = ? ORDER BY appointment.ap_date desc',
            [clientId]
        );
        // console.log("Rows returned:", rows);
        return rows;
    },
    getAppointmentByVetId: async (vetId) => {
        const [rows] = await db.query(
            'SELECT appointment.id,animal.name as animalName, description, service.name, appointment.ap_date as date, appointment.status, CONCAT(user.first_name, " ", user.last_name) AS clientName, service.price, animal_type.type ' +
            'FROM appointment ' +
            'JOIN client ON client.id = appointment.client_id ' +
            'JOIN vet ON vet.id = appointment.vet_id ' +
            'JOIN user ON user.id = client.id ' +
            'JOIN service ON service.id = appointment.service_id ' +
            'JOIN animal ON animal.id = appointment.animal_id ' +
            'JOIN animal_type on animal.animal_type_id = animal_type.id ' +
            'WHERE vet.id = ?',
            [vetId]
        );
        return rows;
    },

    updateAppointmentStatusById: async(id, status) =>{
        const[rows] = await db.query('update appointment set status = ? where id = ?', [status, id]);
        return rows
    },
    changeDate: async (id, newDate) =>{
        return db.query('update appointment set ap_date = ? where id = ?', [newDate, id]);
    },

    updateStatus: async (date) => {
        const [rows] = await db.query("update appointment set status = 'completed' where ap_date < ? and status = 'scheduled'", [date]);
        return rows
    }


}
module.exports = Appointment