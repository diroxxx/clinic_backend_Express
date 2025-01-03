const db = require('../MyDatabase')

const Client = {

    doesClientExist: async (email, password) => {
         const [rows] = await db.query('select * from user where user.email = ? and user.password = ?  and  id in (select user_id from client)', [email, password]);
        return rows.length > 0 ? rows[0] : null;

    },
    getArticles: async () => {
        const [rows] = await
            db.query('select article.id, title, content, article.date AS publicationDate, CONCAT(user.first_name, " ", user.last_name) AS author  from article join vet on vet_id = vet.id ' +
                'join user on user.id = vet.user_id');
        return rows;
    },

    getArt: async () => {
        const [rows] = await
            db.query('select * from article');
        return rows;
    },

    doesClientExistByEmail: async (email) => {
        const [rows] = await db.query("select * from client  email = ?", [email]);
        return rows;
    },
    getUserInfo: async (id) => {
        const [rows] = await db.query('select user.* from user join client on user.id = client.user_id where client.id = ?', [id]);
        return rows[0];
    }

}

module.exports = Client