import Joi from "joi"

export const signupValidation = Joi.object({
    username: Joi
    .string()
    .required(),
    email: Joi
        .string()
        .email()
        .required(),
    password: Joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirmPassword:Joi
        .string()
        .required(),
    phoneNumber:Joi
        .string(),
    otp:Joi
        .string(),
    role:Joi
        .string().valid('instructor', 'student').required(),    
})