import {ObjectId} from "mongoose"

export interface CategoryEntity {
	_id?: ObjectId;
	name: string;
    description:string;
    imageUrl:string;
	status: boolean;
	count?:number;
}