import bcrypt from "bcryptjs"; // for hasing the password

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("hello123", 10),
    isAdmin: true,
  },
  {
    name: "Jack doe",
    email: "jack@gmail.com",
    password: bcrypt.hashSync("hello123", 10),
    isAdmin: false,
  },
  {
    name: "Harry Potter",
    email: "harry@gmail.com",
    password: bcrypt.hashSync("hello123", 10),
    isAdmin: false,
  },
  {
    name: "Sophia Brooks",
    email: "sophia@gmail.com",
    password: bcrypt.hashSync("hello123", 10),
    isAdmin: false,
  },
];

export default users;
