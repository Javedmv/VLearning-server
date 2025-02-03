import { S3Client, PutObjectCommand, PutObjectCommandInput, GetObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


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



/**
 * Generates a publicly accessible URL for an S3 object valid for 1 day (24 hours).
 * 
 * @param {string} bucketName - Name of the S3 bucket.
 * @param {string} filePath - Path of the file in the S3 bucket.
 * @returns {Promise<string>} - Publicly accessible URL.
 */
export const getPublicUrl = async (bucketName:string, filePath:string) => {
    try {
      const command = new GetObjectCommand({Bucket: bucketName, Key: filePath });
      
      // Generate a signed URL
      const url = getSignedUrl(s3Client,command,{ expiresIn: 15 * 60 } );
      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw new Error('Could not generate signed URL');
    }
  };




// Function to delete files from S3 based on the array of file names
export const removeFilesFromS3 = async (urls: string[]) => {
    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME!,  // Make sure to use your bucket name from the environment
      Delete: {
        Objects: urls.map((fileName) => ({ Key: fileName }))
      }
    };
  
    const command = new DeleteObjectsCommand(deleteParams);
  
    try {
      // Deleting the files from S3 using the send method
      const data = await s3Client.send(command);
      console.log('Files deleted successfully:', data);
    } catch (error) {
      console.error('Error deleting files from S3:', error);
    }
};
