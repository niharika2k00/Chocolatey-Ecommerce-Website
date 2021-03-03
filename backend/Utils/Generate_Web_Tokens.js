
import jwt from "jsonwebtoken";

// sign() --> takes 3 parameter (payload , {obj} , secret_key).
// In JSON Web Tokens, the PAYLOAD is a set of fields u wants to include in the token being generated; 
const Generate_Web_Tokens = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "10d" })
}

export default Generate_Web_Tokens;