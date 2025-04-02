import Ajv from "ajv";
import addFormats from "ajv-formats";
import { TransactionFiltersDTO } from "../dto/transactionFilters.dto";
import { transactionCategories } from "./enums/transactionCategories";
import { transactionTypes } from "./enums/transactionTypes";

const ajv = new Ajv({ allErrors: true, useDefaults: true });
addFormats(ajv);

const schemaTransactionFiltersDTO = {
    type: "object",
    properties: {
        lowerThenAmount: { type: "number", minimum: 0 },
        higherThenAmount: { type: "number", minimum: 0 },
        type: { type: "array", items: { type: "string", enum: transactionTypes } },
        category: { type: "array", items: { type: "string", enum: transactionCategories } },
        transactionStartDate: { type: "string", format: "date" },
        transactionEndDate: { type: "string", format: "date" }
    },
    required: [],
    additionalProperties: false
};

const validate = ajv.compile(schemaTransactionFiltersDTO);

export function validateTransactionFiltersDTO(transactionFiltersData: TransactionFiltersDTO) {
    const valid = validate(transactionFiltersData);
    if (!valid) {
        return validate.errors?.map(err => `${err.instancePath} ${err.message}`);
    }
    return null;
}

