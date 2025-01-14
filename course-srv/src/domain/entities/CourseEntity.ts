import { Document } from "mongoose";

export interface CourseEntity extends Document {
    instructorId:string,
    instructor?: string | {},
    basicDetails: {
      title: string;
      description: string;
      thumbnail: string; // No thumbnailPreview
      language: string;
      category: string | {};
      whatWillLearn: string[];
    };
    courseContent: {
      lessons: {
        title: string;
        description: string;
        duration: string;
        videoUrl: string | null; // No videoPreview
        isIntroduction: boolean;
      }[];
    };
    pricing: {
      type: 'free' | 'paid';
      amount?: number;
      hasLifetimeAccess: boolean;
      subscriptionType?: 'one-time' | 'subscription';
    };
    metadata: {
      createdBy: string;
      createdAt: Date;
      updatedBy: string;
      updatedAt: Date;
    };
}

export default CourseEntity;