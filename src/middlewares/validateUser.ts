import { body } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

export const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name: ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name: ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .exists()
    .withMessage("No puede estar vacio")
    .trim()
    .isEmail()
    .withMessage("Email debe tener un formato correo@gmail.com"),
];
