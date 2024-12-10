const db = require('../MyDatabase');

const Service = {

    getTypesOfServices: async () => {
        const [types] = await db.query('SELECT * FROM service');
        return types;
    }



}
module.exports = Service