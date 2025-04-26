import { ObjectId } from "mongoose";

export namespace ChatEntity {
    export interface Params {
        groupName: string;
        courseId: string;
        instructorId:string;
        users: [ string ];
        latestMessage: string;
        wherebyMeetingId?: string;
        wherebyRoomUrl?: string;
        wherebyHostRoomUrl?: string;
        isStreamActive?: boolean;
    }
    export interface Result {
        _id: ObjectId;
        groupName: string,
        courseId: ObjectId;
        instructorId: ObjectId;
        users: [ObjectId];
        latestMessage: ObjectId;
        wherebyMeetingId?: string;
        wherebyRoomUrl?: string;
        wherebyHostRoomUrl?: string;
        isStreamActive?: boolean;
        createdAt?: Date | string;
        updatedAt?: Date | string;
    }
}