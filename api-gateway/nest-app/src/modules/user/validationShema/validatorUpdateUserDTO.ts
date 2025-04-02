import Ajv from "ajv";
import addFormats from "ajv-formats";
import { UpdateUserDTO } from "../dto/updateUser.dto";

const ajv = new Ajv();
addFormats(ajv);

const schemaUpdateUserDTO = {
    type: "object",
    properties: {
        username: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string"}
    },
    additionalProperties: false
};

const validator = ajv.compile(schemaUpdateUserDTO);

export function validateUpdateUserDTO(updateData: UpdateUserDTO) {
    const valid = validator(updateData);
    if (!valid) {
        return validator.errors?.map(err => (err.message));
    }
    return null;
}
