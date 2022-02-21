//THIS FILE HAS USER MODEL

const mongoose = require('mongoose'); 
const validator = require('validator');
const bcrypt = require('bcryptjs');

//Created schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"A user must have a name"],
        trim:true
    },
    email:{
        type: String,
        required:[true,"A user must have a email"],
        validate:[validator.isEmail,"provide a valid email"],
    },
    password:{
        type: String,
        required:[true,"A user must have a password"],
        trim:true,
    },
    passwordConfirm:{
        type: String,
        required:[true,"A user must have a password"],
        trim:true,
        validate:{
            validator: function(el){
                return el === this.password;
            },
            message: "password and confirm password do not match"
        }
    },
    phoneNumber:{
        type:String,
        required:[true,"The user must have a number"],
        validate:[validator.isMobilePhone,"Provide valid number"]
    },
    dob:{
        type:String,
        required:[true,"Must provide date of birth"],
        validate:[validator.isDate,"Provide valid date"]
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};

//created model out of schema
const User = mongoose.model('User',userSchema);

module.exports = User;