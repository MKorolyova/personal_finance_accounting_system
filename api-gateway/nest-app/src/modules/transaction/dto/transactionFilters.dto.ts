export class TransactionFiltersDTO {
    lowerThenAmount?: number;
    higherThenAmount?: number;
    type?: string[];
    category?: string[]; 
    transactionStartDate?: string;
    transactionEndDate?: string;
}