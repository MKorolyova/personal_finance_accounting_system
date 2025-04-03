import Ajv from "ajv";
import addFormats from "ajv-formats";
import { TransactionDTO } from "../dto/transaction.dto";
import { transactionCategories } from "./enums/transactionCategories";
import { transactionTypes } from "./enums/transactionTypes";
import { GoalDTO } from "src/modules/goal/dto/goal.dto";


function getSchemaTransactionDTO(userGoals: GoalDTO[]) {
    return {
        type: "object",
        properties: {
            id: { type: "string" },
            amount: { type: "number" },
            type: { type: "string", "enum": transactionTypes },
            category: { type: "string", "enum": Array.from(new Set([...transactionCategories, ...userGoals.map(goal => goal.goalName)]))  },
            description: { type: "string" },
            transactionDate: { type: "string", "format": "date" }
        },
        required: ["amount", "type", "category", "transactionDate"],
        additionalProperties: false
    };
}

export function validateTransactionDTO(transactionData: TransactionDTO, userGoals: GoalDTO[]) {
    const ajv = new Ajv();
    addFormats(ajv);
    const schemaTransactionDTO = getSchemaTransactionDTO(userGoals);
    const validator = ajv.compile(schemaTransactionDTO);

    const valid = validator(transactionData);
    if (!valid) {
        return validator.errors?.map(err => err.message);
    }
    return null;
}
