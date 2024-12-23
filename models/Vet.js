const db = require('../MyDatabase')

const Vet = {

    doesVetExist: async (email, password) => {
        // const [rows] = await db.query('select * from user  where user.email = ? and user.password = ?  and  id in (select user_id from vet) ', [email, password]);
        const [rows] = await db.query('SELECT vet.id ' +
            'FROM user ' +
            'JOIN vet ON user.id = vet.user_id ' +
            'WHERE user.email = ? AND user.password = ?', [email, password]);
        return rows.length > 0 ? rows[0] : null;

    },

    getVets: async () => {
        const [rows] = await db.query("select vet.id, user.first_name , user.last_name  from vet join user on vet.user_id = user.id ")
        return rows;
    },

    getVetInfo: async (id) => {

        const [rows] = await db.query('select user.* from user join vet on user.id = vet.user_id where vet.id = ?', [id]);
        return rows[0];
    },


}
module.exports = Vet