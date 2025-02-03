import {model, Schema} from "mongoose";
import { IAddBanner } from "../../../../domain/entities/BannerEntity";

const BannerSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        enum: ['promotional', 'informational', 'sale'],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});

export const BannerModel = model<IAddBanner.Result>('banners', BannerSchema);