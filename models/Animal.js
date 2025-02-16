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
        const [rows] = await db.query('select animal.* , animal_type.type  from animal ' +
            'join client on animal.client_id = client.id ' +
            'join animal_type on animal.animal_type_id = animal_type.id ' +
            'where client_id = ?', [clientId]);
        return rows
    },

    // deleteAnimalbyId: async (id) => {
    //     const[rows] = await db.query('DELETE FROM animals WHERE id = ?', [id]);
    // }

    addAnimal: async (clientId, name, typeId) => {
        const [rows] = await db.query('insert into animal (name, animal_type_id, client_id) values(?,?,?)', [name, typeId, clientId])
        return rows;
    }
}
module.exports = Animal;