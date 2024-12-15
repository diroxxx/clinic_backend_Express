const db = require('../MyDatabase')

const Vet = {

    doesVetExist: async (email, password) => {
        const [rows] = await db.query('select * from user  where user.email = ? and user.password = ?  and  id in (select user_id from vet) ', [email, password]);
        return rows.length > 0 ? rows[0] : null;

    },

    getVets: async () => {
        const [rows] = await db.query("select *, user.first_name , user.last_name  from vet join user on vet.id = user.id ")
        return rows;
    }

}
module.exports = Vet