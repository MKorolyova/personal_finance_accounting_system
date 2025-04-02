import Ajv from "ajv";
import addFormats from "ajv-formats";
import { LogInDTO } from "../dto/logIn.dto";

const ajv = new Ajv();
addFormats(ajv);

const schemaLogInDTO = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string"}
    },
    required: ["email", "password"],
    additionalProperties: false
};

const validator = ajv.compile(schemaLogInDTO);

export function validateLogInDTO(logInData: LogInDTO) {
    const valid = validator(logInData);
    if (!valid) {
        return validator.errors?.map(err => (err.message));
    }
    return null;
}
