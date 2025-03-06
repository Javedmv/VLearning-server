import { ObjectId } from "mongoose";

export namespace ChatEntity {
    export interface Params {
        users: [ string ];
        latestMessage: string;
    }
    export interface Result {
        _id: ObjectId;
        users: [ObjectId];
        latestMessage: ObjectId;
        createdAt?: Date | string;
        updatedAt?: Date | string;
    }
}