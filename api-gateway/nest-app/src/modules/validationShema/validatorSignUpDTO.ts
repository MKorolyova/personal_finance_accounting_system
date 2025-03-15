import Ajv from "ajv";
import addFormats from "ajv-formats";
import { SignUpDTO } from "../dto/signUp.dto";

const ajv = new Ajv();
addFormats(ajv);

const schemaSignUpDTO = {
    type: "object",
    properties: {
        username: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string"}
    },
    required: ["username", "email", "password"],
    additionalProperties: false
};

const validator = ajv.compile(schemaSignUpDTO);

export function validateSignUpDTO(signUpData: SignUpDTO) {
    const valid = validator(signUpData);
    if (!valid) {
        return validator.errors?.map(err => (err.message));
    }
    return null;
}
