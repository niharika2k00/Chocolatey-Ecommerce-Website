
import bcrypt from 'bcryptjs';  // for hasing the password

const users = [
    {
        name: "Admin User",
        email: "john@gmail.com",
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },

    {
        name: "Jack doe",
        email: "jk@gmail.com",
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },

    {
        name: "Harry Potter",
        email: "hp@gmail.com",
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },

    {
        name: "Hermione",
        email: "her@gmail.com",
        password: bcrypt.hashSync('44', 10),
        isAdmin: false
    },

]
export default users;