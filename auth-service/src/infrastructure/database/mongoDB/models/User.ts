import {model,Schema} from 'mongoose';
import { UserEntity } from '../../../../domain/entities';
import { required, string } from 'joi';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:["student","admin","instructor"],
        default: "student"
    },
    profile:{
        avatar:{
            type: String
        },
        dob:{
            type: String
        },
        gender:{
            type:String,
            enum:["male","female","other"]
        }
    },
    contact:{
        additionalEmail:{
            type:String
        },
        socialMedia: {
            instagram: String,
            linkedIn: String,
            github: String
        }
    },
    phoneNumber:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default: false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    profession:{
        type:String
    },
    profit:{
        type:Number,
        default:0
    },
    cv: {
        type: String,
    },
    isNewUser: {
        type:Boolean,
        default: true
    }
},{
    timestamps:true
})

export const User = model<UserEntity>("users",userSchema)