import mongoose from "mongoose";
import { MessageEntity } from "../../../../domain/entities";
import { MessageModel } from "../models";

export const addNewMessage = async (body: MessageEntity.Params): Promise<MessageEntity.Result | null> => {
    try {
        console.log(body, "in the repo");

        const chatId = new mongoose.Types.ObjectId(body.chatId);
        const sender = new mongoose.Types.ObjectId(body.sender);

        const newMessage = new MessageModel({
            content: body.content,
            chatId,
            sender,
            contentType: body.contentType,
            receiverSeen: body.recieverSeen,
            type:body.type,
        });

        const savedMessage = await newMessage.save();

        return savedMessage;
    } catch (error) {
        console.error("ERROR IN REPO addNewMessage", error);
        throw new Error("Failed to add new message");
    }
};
