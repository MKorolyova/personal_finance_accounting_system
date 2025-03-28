import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

  
  @Entity('transaction')
  export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    userId: string; 
  
    @Column({ type: 'decimal', scale: 2 })
    amount: number;
    
  
    @Column({
        type: 'enum',
        enum: ['income', 'expense'], 
      })
      type: string;
    
      @Column({
        type: 'enum',
        enum: [
          'car', 'charity', 'budget and taxes', 'cash', 'money transfers',
          'investments', 'other', 'office supplies', 'cafes and restaurants',
          'flowers', 'cinema', 'books', 'utilities', 'beauty', 'health',
          'courier services', 'clothing and shoes', 'household appliances',
          'loan repayment', 'travel', 'mobile top-up', 'subscriptions',
          'groceries', 'advertising services', 'repairs', 'entertainment and sports',
          'insurance', 'taxi', 'pets', 'fines', 'jewelry'
        ],
      })
      category: string;

    @Column({ type: 'text' })
      description: string;
      
      
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    transactionDate: Date;
  }

