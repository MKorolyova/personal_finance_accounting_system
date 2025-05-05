import Ajv from "ajv";
import addFormats from "ajv-formats";
import { CreateTransactionDTO } from "../dto/createTransaction.dto";
import { transactionCategories } from "./enums/transactionCategories";
import { transactionTypes } from "./enums/transactionTypes";
import { GoalDTO } from "src/modules/goal/dto/goal.dto";


function getSchemaCreateTransactionDTO(userGoals: GoalDTO[]) {
    return {
        type: "object",
        properties: {
            amount: { type: "number" },
            type: { type: "string", "enum": transactionTypes },
            category: { type: "string", "enum": Array.from(new Set([...transactionCategories, ...userGoals.map(goal => goal.goalName)]))  },
            description: { type: "string" },
            transactionDate: { type:"string", format: "date-time"}
        },
        required: ["amount", "type", "category", "transactionDate"],
        additionalProperties: false
    };
}

export function validateCreateTransactionDTO(createTransactionData: CreateTransactionDTO, userGoals: GoalDTO[]) {
    const ajv = new Ajv();
    addFormats(ajv);
    const schemaCreateTransactionDTO = getSchemaCreateTransactionDTO(userGoals);
    const validator = ajv.compile(schemaCreateTransactionDTO);

    const valid = validator(createTransactionData);
    if (!valid) {
        return validator.errors?.map(err => err.message);
    }
    return null;
}
