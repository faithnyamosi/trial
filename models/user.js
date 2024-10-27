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
        minLength: [8, "password must be atleast 8 characters long"],
        maxLength: [16],
        select:false//exclude password from query results by default

    },
    confirmPassword: {
        required: [true, "confirm the pasword"],
        type: "string",
        validate:{
            validator:function(value){
                returnvalue ===this.password;
            },
            message: "passwords do not match"
        }

    },
    phone: {
        type:"string"
    },
    phoneNumber: {
        required: [true,"enter phone number"],
        type: "string",
        
    },

    userName: {
        unique: [true, "Usernme already taken"],
        required: [true, "enter the username"],
        minLength: [16],
        maxLength: [32]

    },
    firstName: {
        type: "string",
        required: [true, "please enter first name"],

    },
    
    lastName: {
        type: "string",
        required: [true, "please enter last name"],
    },


});
//hashing password before saving the user document
userSchema.pre('save', async function(next) {
    if(!this.ismodified('password')){
        return next();
    }
    //hash the password with a salt round of 10
    this.confirmPassword= await bcryptjs.hash(this.password, 10);
    //clear password field after the validation
    this.confirmPassword=undefined;
    next();
    
})
//method comparing the input password vs stored hashed password
userSchema.methods.comparepassword= async function (inputPassword) {
   return await bcryptjs.compare(inputPassword, this.password);
    
};
//export the module
const User = mongoose.model('User', userSchema);
export default User;
