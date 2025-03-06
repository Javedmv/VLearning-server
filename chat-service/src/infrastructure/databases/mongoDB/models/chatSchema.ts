import { model, Schema, Types } from "mongoose";
import { ChatEntity } from "../../../../domain/entities";

const chatSchema = new Schema({
    users: [{
        type: Types.ObjectId,
        ref: "users",
        required: true
    }],
    latestMessage: {
        type: Types.ObjectId,
        ref: "messages"
    }
}, {
    timestamps: true
});

export const ChatModel = model<ChatEntity.Result>("chats", chatSchema);