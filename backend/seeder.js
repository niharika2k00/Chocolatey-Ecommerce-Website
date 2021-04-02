
// For importing sample data's ---- into the DATABASE

import mongoose from 'mongoose';
import UsErS from './Data/users.js';
import prdk from './Data/products.js';
import dotenv from 'dotenv';
import User from './Models/UserModels.js';
import Order from './Models/OrderModels.js';
import Product from './Models/ProductModels.js';
import ConnectDB from './config/DB.js';
import colors from 'colors';

dotenv.config();
ConnectDB();

// async-await bcz we are fetching data frm the database so everything will RETURN A PROMISE
const importDATA = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(UsErS); // It's an array of all the users-- fetched from our sample data      
        const adminUser = createdUsers[0]._id;
        // console.log(adminUser);
        const sampleProducts = prdk.map(product => {  //prdk ---> the product.js 
            return { ...product, user: adminUser } // ...products includes all the stuffs of the product with addition to the adminUser field
        })

        await Product.insertMany(sampleProducts); // insert the final data with the admin field
        console.log("DATA IMPORTED".green.inverse);
        process.exit();
    }

    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

const destroyedDATA = async () => {  // async bcz it we are fetching data frm the database so everything returns a promiss 
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("DATA DESTROYED !!".red.inverse);
        process.exit();
    }
    catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}


if (process.argv[2] === '-d')
    destroyedDATA();
else
    importDATA();



/*  npm run data:import      ----> for importing into the Data Base  */


