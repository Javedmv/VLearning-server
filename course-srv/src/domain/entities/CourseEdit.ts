interface Lesson {
    title: string;
    description: string;
    duration: string;
    videoUrl: string;
    isIntroduction: boolean;
    _id: string;
    videoPreview?: {url:string, duration:string};     // Optional video preview object
  }
  
export interface CourseContent {
    lessons: Lesson[];
    _id: string;
  }