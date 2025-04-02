import Ajv from "ajv";
import addFormats from "ajv-formats";
import { TransactionDTO } from "../dto/transaction.dto";
import { transactionCategories } from "./enums/transactionCategories";
import { transactionTypes } from "./enums/transactionTypes";

const ajv = new Ajv();
addFormats(ajv);

const schemaTransactionDTO = {
    type: "object",
    properties: {
        id: { type: "string" },
        amount: { type: "number" },
        type: { type: "string", "enum": transactionTypes},
        category: { type: "string", "enum": transactionCategories},
        description: { type: "string"},
        transactionDate: {"type": "string", "format": "date"}
    },
    required: ["amount", "type", "category", "transactionDate"],
    additionalProperties: false
};

const validator = ajv.compile(schemaTransactionDTO);

export function validateTransactionDTO(transactionData: TransactionDTO) {
    const valid = validator(transactionData);
    if (!valid) {
        return validator.errors?.map(err => (err.message));
    }
    return null;
}
