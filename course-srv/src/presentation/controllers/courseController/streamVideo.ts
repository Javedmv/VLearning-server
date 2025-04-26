import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { promises } from "dns";
import { TOBE } from "../../../_lib/common/Tobe";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const streamVideo = (dependencies: IDependencies) => {
    const { repositories: { courseDetailMyLearning } } = dependencies;
    
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { lessonId } = req.params;
            const enrollmentId = req.query.enrollmentId as string;
            
            if (!req.user) {
                res.status(401).json({ message: "Unauthorized" });
                return
            }
            
            // Verify user is enrolled in the course containing this lesson
            const enrollments = await courseDetailMyLearning(enrollmentId, req.user._id);
            
            if (!enrollments || enrollments.length === 0) {
                res.status(403).json({ message: "Not enrolled in this course" });
                return
            }
            
            const enrollment = enrollments[0];
            const course:TOBE = enrollment.courseId;
            
            // Find the lesson in the course
            const lesson = course.courseContent.lessons.find(
                (l: TOBE) => l._id.toString() === lessonId
            );
            
            if (!lesson) {
                 res.status(404).json({ message: "Lesson not found" });
                 return
            }
            
            const videoKey = lesson.videoUrl;
            
            // Configure S3 client
            const s3Client = new S3Client({
                region: process.env.AWS_REGION || 'us-east-1',
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
                }
            });
            
            // Get video metadata to determine size
            const headCommand = new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: videoKey
            });
            
            // Handle range requests for video seeking
            const range = req.headers.range;
            let params: TOBE = {
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: videoKey
            };
            
            try {
                const headObject = await s3Client.send(headCommand);
                const fileSize = headObject.ContentLength || 0;
                
                if (range) {
                    const parts = range.replace(/bytes=/, "").split("-");
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    
                    // Limit chunk size to 1MB for better performance
                    const chunkSize = Math.min(end - start + 1, 1024 * 1024);
                    const contentEnd = Math.min(start + chunkSize - 1, fileSize - 1);
                    
                    params.Range = `bytes=${start}-${contentEnd}`;
                    
                    res.writeHead(206, {
                        'Content-Range': `bytes ${start}-${contentEnd}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': contentEnd - start + 1,
                        'Content-Type': headObject.ContentType || 'video/mp4'
                    });
                } else {
                    res.writeHead(200, {
                        'Content-Length': fileSize,
                        'Content-Type': headObject.ContentType || 'video/mp4'
                    });
                }
                
                // Get and stream the video
                const getCommand = new GetObjectCommand(params);
                const { Body } = await s3Client.send(getCommand);
                
                if (Body instanceof Readable) {
                    Body.pipe(res);
                } else {
                    throw new Error("Unable to stream video");
                }
                
            } catch (error) {
                console.error("Error streaming video:", error);
                res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
                    createResponse(
                        StatusCode.INTERNAL_SERVER_ERROR,
                        undefined,
                        "Error streaming video"
                    )
                );
                return
            }
            
        } catch (error) {
            next(error);
        }
    };
};