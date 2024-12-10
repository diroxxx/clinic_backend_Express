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
        // const [animalTypes] = await db.query('select * FROM animal_type');
        // return animalTypes;
        try {
            const [animalTypes] = await db.query('SELECT * FROM animal_type');
            return animalTypes;
        } catch (error) {
            console.error("Database query error:", error);
            throw error; // Rzucamy wyjątek, aby kontroler obsłużył błąd
        }
    }


}
module.exports = Animal;