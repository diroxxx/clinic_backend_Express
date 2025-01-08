const db = require('../MyDatabase')


const User = {


    doesUserExist: async (email) => {
        const [rows] = await db.query("select * from user where  email = ?", [email]);
        return rows;
    },
    doesUserExistLogin: async (email, password) => {
        const [rows] = await db.query("select * from user where  email = ? and password", [email]);
        return rows;
    },

    addUser: async ( firstName, lastName , email , phoneNumber , password, role ) => {
            const [result] =
                await db.query(
                    "insert into user (first_name, last_name, email, phone_number, password) values (?, ?, ?, ?, ?)",
                    [firstName, lastName, email, phoneNumber, password]
                );

            if (role === 'vet') {
              const [newVet] =  await db.query("insert into vet (years_of_experience, user_id) values (?, ?)", [0, result.insertId]);
              return newVet;
            } else if (role === 'client') {
              const [newUSer] =   await db.query("insert into client (user_id) values (?)", [result.insertId]);
              return newUSer;
            }
            return null;
    },

    updateUser: async (userId,
                       userToChange, isUserVet) => {

        console.log(userToChange)
        // if (isUserVet === 'vet') {
        console.log(userId)
            const [rows] = await db.query("update user u set u.first_name= ? , u.last_name = ?, u.email=?, u.phone_number=?, u.password=? where u.id = ? ",[userToChange.first_name, userToChange.last_name,userToChange.email, userToChange.phone_number, userToChange.password, userToChange.id]);
            return rows.affectedRows;
    }


}
module.exports = User