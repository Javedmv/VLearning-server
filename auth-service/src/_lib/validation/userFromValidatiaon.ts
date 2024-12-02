import Joi from "joi";

export const userFormValidation = Joi.object({
  username: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Username is required.",
    }),
  firstName: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "First name is required.",
    }),
  lastName: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Last name is required.",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email is required.",
    }),
  phoneNumber: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Phone number is required.",
    }),
  role: Joi.string()
    .trim()
    .valid("instructor", "student")
    .required()
    .messages({
      "any.only": "Role must be either 'instructor' or 'student'.",
      "string.empty": "Role is required.",
    }),
  profile: Joi.object({
    dob: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Date of birth is required.",
      }),
    gender: Joi.string()
      .valid("male", "female", "other")
      .required()
      .messages({
        "any.only": "Gender must be 'male', 'female', or 'other'.",
        "string.empty": "Gender is required.",
      }),
    avatarPreview: Joi.string(),
  }).required(),
  profession: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Profession is required.",
    }),
  profileDescription: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Profile description is required.",
    }),
  additionalEmail: Joi.string()
    .email()
    .messages({
      "string.email": "Additional email must be a valid email address.",
    }),
  isNewUser: Joi.boolean().optional(),
});
