import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';


const userSchema = new mongoose.Schema({
    email: {
        unique: [true, "email already taken"],
        type: "string",
        required: [true, "please enter the email"]
    },
    password: {
        type: "string",
        required: [true, "please enter the password"],
        minLength: [8],
        maxLength: [16]

    },
    confirmPassword: {
        required: [true, "confirm the pasword"],
        type: "string"

    },

    username: {
        unique: [true, "Usernme already taken"],
        required: [true, "enter the username"],
        minLength: [16],
        maxLength: [32]

    }

})