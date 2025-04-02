import Ajv from "ajv";
import addFormats from "ajv-formats";
import { GoalDTO } from "../dto/goal.dto";
import { goalStatus } from "./enums/goalStatus";

const ajv = new Ajv();
addFormats(ajv);

const schemaGoalDTO = {
    type: "object",
    properties: {
        id: { type: "string" },
        targetAmount: { type: "number" },
        currentAmount: { type: "number" },
        goalName: { type: "string"},
        status: { type: "string", "enum": goalStatus},
        deadline: {"type": "string", "format": "date"}
    },
    required: ["targetAmount", "currentAmount", "goalName", "status", "deadline"],
    additionalProperties: false
};

const validator = ajv.compile(schemaGoalDTO);

export function validateGoalDTO(goalData: GoalDTO) {
    const valid = validator(goalData);
    if (!valid) {
        return validator.errors?.map(err => (err.message));
    }
    return null;
}
