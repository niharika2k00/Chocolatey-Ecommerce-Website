
import bcrypt from 'bcryptjs';  // for hasing the password

const users = [
    {
        name: "ADMIN_Niharika",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },

    {
        name: "Jack doe",
        email: "jack@gmail.com",
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },

    {
        name: "Harry Potter",
        email: "harry@gmail.com",
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },

    {
        name: "Hermione",
        email: "hermione@gmail.com",
        password: bcrypt.hashSync('44', 10),
        isAdmin: false
    },

]
export default users;