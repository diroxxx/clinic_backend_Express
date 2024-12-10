const db = require('../MyDatabase')

const Vet = {
    doesVetExist: async (email, password) => {
        const [row] = await db.query('select * from vet join user on vet.id = user.id where user.email = ? and user.password = ? ', [email, password]);
        return row[0];
    }

}
module.exports = Vet