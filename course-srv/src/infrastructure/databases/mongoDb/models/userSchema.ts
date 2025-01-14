import {model,Schema,Types} from 'mongoose';
import { UserEntity } from '../../../../domain/entities/userEntity';

const userSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
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
        type:String,
        enum:["requested","approved","declined","false"],
        default:"false"
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
    },
    qualification:{
        type: String,
    },
    profileDescription:{
        type: String,
    }
},{
    timestamps:true
})

export const User = model<UserEntity>("users",userSchema)