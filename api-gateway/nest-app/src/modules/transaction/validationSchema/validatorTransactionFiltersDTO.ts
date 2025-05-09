import Ajv from "ajv";
import addFormats from "ajv-formats";
import { TransactionFiltersDTO } from "../dto/transactionFilters.dto";
import { transactionCategories } from "./enums/transactionCategories";
import { transactionTypes } from "./enums/transactionTypes";
import { GoalDTO } from "src/modules/goal/dto/goal.dto";



function  getSchemaTransactionFiltersDTO (userGoals: GoalDTO[]) {
    return{
        type: "object",
        properties: {
            lowerThenAmount: { type: "number", minimum: 0 },
            higherThenAmount: { type: "number", minimum: 0 },
            type: { type: "array", items: { type: "string", enum: transactionTypes } },
            category: { type: "array", items: {type: "string","enum": Array.from(new Set([...transactionCategories, ...userGoals.map(goal => goal.goalName)])) } },
            transactionStartDate: { type:"string",  format: "date"},
            transactionEndDate: { type:"string", format: "date"}
        },
        required: [],
        additionalProperties: false
    }
};

export function validatorTransactionFiltersDTO(transactionFiltersData: TransactionFiltersDTO,  userGoals: GoalDTO[]) {
    const ajv = new Ajv();
    addFormats(ajv);
    const schemaTransactionFiltersDTO = getSchemaTransactionFiltersDTO(userGoals);
    const validator = ajv.compile(schemaTransactionFiltersDTO);
    
    const valid = validator(transactionFiltersData);
    if (!valid) {
        return validator.errors?.map(err => `${err.instancePath} ${err.message}`);
    }
    return null;
}







