import { model, Schema, Types } from "mongoose";
import { ChatEntity } from "../../../../domain/entities";

const chatSchema = new Schema({
    groupName: {
        type: String,
        required: true,
    },
    courseId: {
        type: Types.ObjectId,
        ref:"Courses",
        required: true
    },
    instructorId:{
        type: Types.ObjectId,
        required:true,
        ref:"users"
    },
    users: [{
        type: Types.ObjectId,
        ref: "users",
    }],
    latestMessage: {
        type: Types.ObjectId,
        ref: "messages"
    },

}, {
    timestamps: true
});

export const ChatModel = model<ChatEntity.Result>("chats", chatSchema);