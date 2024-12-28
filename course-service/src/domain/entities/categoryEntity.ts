import {Types} from "mongoose"

export interface CategoryEntity {
	_id: Types.ObjectId;
	name: string;
    description:string;
    imageUrl:string;
	status: boolean;
	count?:number;
}