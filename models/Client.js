const db = require('../MyDatabase')

const Client = {

    doesClientExist: async (email, password) => {
         const [row] = await db.query('select * from client join user on client.id = user.id where user.email = ? and user.password = ? ', [email, password]);
        return row[0];
    },
    getArticles: async () => {
        const [rows] = await
            db.query('select article.id, title, content, article.date AS publicationDate, CONCAT(user.first_name, " ", user.last_name) AS author  from article join vet on vet_id = vet.id ' +
                'join user on user.id = vet.id');
        return rows;
    },


    doesClientExistByEmail: async (email) => {
        const [rows] = await db.query("select * from client  email = ?", [email]);
        return rows;
    }

}

module.exports = Client