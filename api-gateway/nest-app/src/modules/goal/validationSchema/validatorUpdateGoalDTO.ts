import Ajv from "ajv";
import addFormats from "ajv-formats";
import { UpdateGoalDTO } from "../dto/updateGoal.dto";
import { goalStatus } from "./enums/goalStatus";

const ajv = new Ajv();
addFormats(ajv);

const schemaUpdateGoalDTO = {
    type: "object",
    properties: {
        id: { type: "string" },
        targetAmount: { type: "number" },
        currentAmount: { type: "number" },
        goalName: { type: "string"},
        status: { type: "string", "enum": goalStatus},
        deadline: { type:"string", format: "date-time"}
    },
    additionalProperties: false
};

const validator = ajv.compile(schemaUpdateGoalDTO);

export function validateUpdateGoalDTO(updateData: UpdateGoalDTO) {
    const valid = validator(updateData);
    if (!valid) {
        return validator.errors?.map(err => (err.message));
    }
    return null;
}
