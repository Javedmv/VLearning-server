import { ObjectId } from "mongoose";

enum contents {
    text = "text",
    image = "image",
    audio = "audio",
    video = "video",
    file = "file"
}
export namespace MessageEntity {
    export interface Params {
        sender :  string,
        content? : string,
        chatId :  string,
        contentType? : contents,
        recieverSeen : boolean,
    }
    export interface Result {
        _id?:  ObjectId,
        sender :  ObjectId,
        content? : string,
        chatId :  ObjectId,
        contentType? : contents,
        recieverSeen : boolean,
        createdAt?: Date | string;
        updatedAt?: Date | string;
    }
}