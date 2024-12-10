const db = require('../MyDatabase')


const Animal = {

    getAnimals: async () => {
        const [animals] = await db.query('SELECT * FROM animals');
        return animals;

    },
    getAnimalById: async (id) => {
        const [animal] = await db.query('SELECT * FROM animals WHERE id = ?', [id]);
        return animal;
    },

    getAnimalTypes: async () => {
        try {
            const [animalTypes] = await db.query('SELECT * FROM animal_type');
            return animalTypes;
        } catch (error) {
            console.error("Database query error:", error);
            throw error;
        }
    },

    getAnimalByClientId: async (clientId) => {
        const [rows] = await db.query('select * from animal join client on animal.client_id = client.id where client_id = ?', [clientId]);
        return rows
    }



}
module.exports = Animal;