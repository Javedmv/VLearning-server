import { model,Schema } from "mongoose";
import { CategoryEntity } from "../../../../domain/entities";

const categorySchema:Schema = new Schema<CategoryEntity>({
    name:{
        type:String,
        required: true
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
    versionKey: false
})

export const CategoryModel = model<CategoryEntity>("categorys", categorySchema);