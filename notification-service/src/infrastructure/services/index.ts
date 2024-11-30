import { generateVerificationOtp } from "../../_lib/otp";
import { sendOtpMail } from "../../_lib/nodemailer/mailFunction";
import { sendVerifyMailProducer } from "../kafka/producers";

export const sendVerificationMail = async (email:string) => {
    try {
        const otp = generateVerificationOtp();

        // send mail using nodeMailer
        await sendOtpMail(email,otp);

        await sendVerifyMailProducer({
            email,
            otp
        })
    } catch (error:any) {
        console.log(error)
    }
}