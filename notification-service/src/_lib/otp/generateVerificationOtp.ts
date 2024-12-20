import crypto from 'crypto';

export const generateVerificationOtp = () => {
    const length = 6;
    const chars = "0123456789";
    const charsLength = chars.length;

    let otp = "";
    const randomBytes = crypto.randomBytes(length)

    for(let i = 0; i < length; i++){
        const randomIndex = randomBytes[i] % charsLength;
        otp += chars[randomIndex];
    }
    return otp
}