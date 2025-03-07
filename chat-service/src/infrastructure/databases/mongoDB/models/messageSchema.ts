import { model, Schema, Types } from "mongoose";
import { MessageEntity } from "../../../../domain/entities";

enum contents {
    text = "text",
    image = "image",
    audio = "audio",
    video = "video",
    file = "file"
}

const messageSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: "users",
        required: true
    },
    content: {
        type: String
    },
    chatId: {
        type: Types.ObjectId,
        ref: "chats",
        required: true
    },
    contentType: {
        type: String,
        enum: Object.values(contents),
        default: contents.text
    },
    recieverSeen: {
        type: [String],
        required: true,
        default: []
    },
    type: {
        type: String,
        enum: ["newUser", "message"],
        default: "message"
    }
}, {
    timestamps: true
});

export const MessageModel = model<MessageEntity.Result>("messages", messageSchema);
