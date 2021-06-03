
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({

    name: {  // object 
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        // required: true
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true, })  // 2nd arguement 



// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)   //this.password -->Pswd of EACH individual user as this method is applied to all
}


UserSchema.pre('save', async function (next) {
    if (!this.isModified("password"))
        next();

    const salt = await bcrypt.genSalt(10);                    //generate Salt for my password which need to encrypted.
    this.password = await bcrypt.hash(this.password, salt);
})




// Creating a MODEL  ------   mongoose.model(modelName, schema)
const User = mongoose.model('User', UserSchema)
export default User;



/*  The first argument is the singular name of the collection your model is for. Mongoose automatically looks
for the plural, lowercase version of your model name. Thus, for the example above, the model Tank is for
 the tanks collection in the database. */

/*
       SYNTAX ::
 genSalt(rounds op, minor op, CB optional)
 hash(data, salt, CB op)


 */