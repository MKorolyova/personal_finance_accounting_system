import { CreateTransactionDTO } from "./createTransaction.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateTransactionDTO extends PartialType(CreateTransactionDTO) {
    id: string;
  }
