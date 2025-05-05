import Ajv from "ajv";
import addFormats from "ajv-formats";
import { UpdateTransactionDTO } from "../dto/updateTransaction.dto";
import { transactionCategories } from "./enums/transactionCategories";
import { transactionTypes } from "./enums/transactionTypes";
import { GoalDTO } from "src/modules/goal/dto/goal.dto";


function getSchemaUpdateTransactionDTO(userGoals: GoalDTO[]) {
    return {
        type: "object",
        properties: {
            id: {type: "string"},
            amount: { type: "number" },
            type: { type: "string", "enum": transactionTypes },
            category: { type: "string", "enum": Array.from(new Set([...transactionCategories, ...userGoals.map(goal => goal.goalName)]))  },
            description: { type: "string" },
            transactionDate: { type:"string", format: "date-time"}
        },
        required: ["id"],
        additionalProperties: false
    };
}

export function validateUpdateTransactionDTO(updateTransactionData: UpdateTransactionDTO, userGoals: GoalDTO[]) {
    const ajv = new Ajv();
    addFormats(ajv);
    const schemaUpdateTransactionDTO = getSchemaUpdateTransactionDTO(userGoals);
    const validator = ajv.compile(schemaUpdateTransactionDTO);

    const valid = validator(updateTransactionData);
    if (!valid) {
        return validator.errors?.map(err => err.message);
    }
    return null;
}
