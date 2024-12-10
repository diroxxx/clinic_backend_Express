const db = require('../MyDatabase')

const Vet = {

    doesVetExist: async (email, password) => {
        const [row] = await db.query('select * from vet join user on vet.id = user.id where user.email = ? and user.password = ? ', [email, password]);
        return row[0];
    },

    getVets: async () => {
        const [rows] = await db.query("select *, user.first_name , user.last_name  from vet join user on vet.id = user.id ")
        return rows;
    }

}
module.exports = Vet