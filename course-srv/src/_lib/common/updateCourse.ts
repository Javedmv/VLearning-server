import { Lesson } from "../../presentation/controllers/courseController/getAllCoursesController";
import { getPublicUrl } from "../s3/s3bucket";


export const updateCourse = async (course: any) => {
    const updatedCourse = course.toObject();

    // Update thumbnail URL
    if (updatedCourse?.basicDetails?.thumbnail) {
      const publicThumbnailUrl = await getPublicUrl(
        process.env.S3_BUCKET_NAME!,
        updatedCourse.basicDetails.thumbnail
      );
      updatedCourse.basicDetails.thumbnail = publicThumbnailUrl;
    }
    // Update video URLs for each lesson
    if (updatedCourse?.courseContent?.lessons) {
      updatedCourse.courseContent.lessons = await Promise.all(
        updatedCourse.courseContent.lessons.map(async (lesson: Lesson) => {
          if (lesson.videoUrl) {
            const publicVideoUrl = await getPublicUrl(
              process.env.S3_BUCKET_NAME!,
              lesson.videoUrl
            );
            return {
              ...lesson,
              videoUrl: publicVideoUrl,
            };
          }
          return lesson;
        })
      );
    }

      // Update instructor avatar
  if (updatedCourse?.instructor?.profile?.avatar) {
    const publicAvatarUrl = await getPublicUrl(
      process.env.S3_BUCKET_NAME!,
      updatedCourse.instructor.profile.avatar
    );
    updatedCourse.instructor.profile.avatar = publicAvatarUrl;
  }

  // Update category image URL
  if (updatedCourse?.basicDetails?.category?.imageUrl) {
    const publicCategoryImageUrl = await getPublicUrl(
      process.env.S3_BUCKET_NAME!,
      updatedCourse.basicDetails.category.imageUrl
    );
    updatedCourse.basicDetails.category.imageUrl = publicCategoryImageUrl;
  }

    return updatedCourse;
  };