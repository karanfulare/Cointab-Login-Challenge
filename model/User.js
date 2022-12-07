const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    login:{
        type: Number,
        default:0
    },
    time:{
        type:String,
        default:Date()
        
    }
},{timestamps: true});

const User = mongoose.model('User',userSchema);
module.exports = User


Date.now()
