import User from "../models/userModel.js";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import { generateToken } from "../utils.js";

const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Incomplete details", success: false });
    }   
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(httpStatus.CONFLICT).json({ message: 'User with this email already exists', success: false });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const isAdmin = email === "dakshf219@gmail.com";

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            isAdmin
        });

        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: "User registered", success: true });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", success: false });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Incomplete details", success: false });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password', success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid credentials" });
        }
        const jwtToken = await generateToken(user.email, user._id);
        res.status(httpStatus.OK).json({ success: true, message: "Login successful", jwtToken });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server error' });
    }
};

export {login,signup};