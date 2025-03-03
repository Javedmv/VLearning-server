// models/Course.ts

import mongoose, { Schema, Types } from 'mongoose';
import { CourseEntity } from '../../../../domain/entities';

// BasicDetails Schema
const BasicDetailsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  language: { type: String, required: true },
  category: { type: Types.ObjectId, ref:"categorys", required: true },
  whatWillLearn: { type: [String], required: true },
});

// Lesson Schema
const LessonSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  videoUrl: { type: String, default: null }, // Video URL stored as a string
  isIntroduction: { type: Boolean, required: true },
});

// CourseContents Schema
const CourseContentsSchema = new Schema({
  lessons: { type: [LessonSchema], required: true },
});

// PricingDetail Schema
const PricingDetailSchema = new Schema({
  type: { type: String, enum: ['free', 'paid'], required: true },
  amount: { type: Number, default: null },
  hasLifetimeAccess: { type: Boolean, required: true },
  subscriptionType: { type: String, enum: ['one-time', 'subscription'], default: null },
});

// Main Course Schema
const CourseSchema = new Schema({
  instructorId: {type: String, required:true},
  instructor: { type: Types.ObjectId, ref: 'users'},
  students: {type: [String],default:[]},
  basicDetails: { type: BasicDetailsSchema, required: true },
  courseContent: { type: CourseContentsSchema, required: true },
  pricing: { type: PricingDetailSchema, required: true },
  metadata: {
    createdBy: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedBy: { type: String, required: true },
    updatedAt: { type: Date, required: true },
  },
});

export const CourseModel = mongoose.model<CourseEntity>('Courses', CourseSchema);