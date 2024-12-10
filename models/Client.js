const db = require('../MyDatabase')

const Client = {

    doesClientExist: async (email, password) => {
         const [row] = await db.query('select * from client join user on client.id = user.id where user.email = ? and user.password = ? ', [email, password]);
        return row[0];
    }

}

module.exports = Client