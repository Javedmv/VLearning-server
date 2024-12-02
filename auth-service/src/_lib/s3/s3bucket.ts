import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";

export const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
});

interface UploadOptions {
    contentType?: string;
    metadata?: Record<string, string>;
}

export async function uploadToS3(
    source: string | Buffer, 
    bucketName: string, 
    key: string, 
    options: UploadOptions = {}
) {
    try {
        // Handle different input types (file path or buffer)
        const fileContent = source instanceof Buffer ? source : await readFile(source);

        // Prepare upload parameters
        const uploadParams: PutObjectCommandInput = {
            Bucket: bucketName,
            Key: key,
            Body: fileContent,
            ContentType: options.contentType,
            Metadata: options.metadata
        };

       // Create and send the upload command
        const command = new PutObjectCommand(uploadParams);
        const response = await s3Client.send(command);

        console.log('File uploaded successfully:', response);
        return response;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
}
