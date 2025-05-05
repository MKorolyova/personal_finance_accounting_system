import { Transform } from 'class-transformer';

export class TransactionDTO {
  id: string;
  amount: number;
  type: string;
  category: string;
  description: string;

  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value), { toPlainOnly: true })
  transactionDate: string;
}
