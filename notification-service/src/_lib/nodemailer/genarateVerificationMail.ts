import nodemailer from "nodemailer"

export const generateVerificationMail = async (email: string, title: string, body:string) : Promise<void> => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from : "VLearning - Email Verification",
            to: email,
            subject: title,
            html: body
        })

        console.log("Message sent: %s", info.messageId);
        console.log("Response: %s", info.response);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Failed to send email:", error.message); 
        } else {
            console.error("Failed to send email: An unknown error occurred");
        }
        throw error; // Rethrow the error
    }
    
}