import { model,Schema } from "mongoose";
import { CategoryEntity } from "../../../../domain/entities";

const categorySchema:Schema = new Schema({
    name:{
        type:String,
        required: true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{ 
        type: String, required: true 
    },
    status: {
        type: Boolean, default: true 
    },
    count: {
        type: Number, default: 0 
    }
},{
    timestamps:true,
})

export const CategoryModel = model<CategoryEntity>("categorys", categorySchema);

export interface ICategoryDocument extends CategoryEntity {
    createdAt: Date,
    updatedAt: Date
};