import mongoose from "mongoose";
import colors from "colors";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB Connected : ${conn.connection.host}`.white.underline.bold
    );
  } catch (error) {
    console.error(`Error : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default ConnectDB;
