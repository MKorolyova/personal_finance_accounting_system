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
        enum: ['income', 'expense', 'goal'], 
      })
      type: string;
    
      @Column({type: 'text'})
      category: string;

    @Column({ type: 'text' })
      description: string;
      
      
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    transactionDate: Date;
  }

