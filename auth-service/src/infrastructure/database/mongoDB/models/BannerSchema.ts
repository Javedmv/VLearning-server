import {model, Schema} from "mongoose";
import { IAddBanner } from "../../../../domain/entities/BannerEntity";
import { required } from "joi";

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
        enum: ['promotional', 'announcement', 'sale'],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: ['high','medium','low'],
        required: true
    }
}, {
    timestamps: true
});

export const BannerModel = model<IAddBanner.Result>('banners', BannerSchema);