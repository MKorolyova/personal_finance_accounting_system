import Ajv from "ajv";
import addFormats from "ajv-formats";
import { goalStatus } from "./enums/goalStatus";
import { CreateGoalDTO } from "../dto/createGoal.dto";

const ajv = new Ajv();
addFormats(ajv);

const schemaCreateGoalDTO = {
    type: "object",
    properties: {
        targetAmount: { type: "number" },
        currentAmount: { type: "number" },
        goalName: { type: "string"},
        status: { type: "string", "enum": goalStatus},
        deadline: { type:"string", format: "date-time"}
    },
    required: ["targetAmount", "currentAmount", "goalName", "status", "deadline"],
    additionalProperties: false
};

const validator = ajv.compile(schemaCreateGoalDTO);

export function validateCreateGoalDTO(createGoalData: CreateGoalDTO) {
    const valid = validator(createGoalData);
    if (!valid) {
        return validator.errors?.map(err => (err.message));
    }
    return null;
}
