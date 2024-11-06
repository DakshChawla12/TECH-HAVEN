import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || "helloWorld";

dotenv.config();

const generateToken = async (email, id) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const jwtToken = jwt.sign(
        { email: email, _id: id },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    return jwtToken;
};


export {generateToken};