import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

  @Entity('goal')
  export class Goal {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    userId: string; 

    @Column({ type: 'decimal', scale: 2 })
    targetAmount: number;
  
    @Column({ type: 'decimal', scale: 2 })
    currentAmount: number;
    
    @Column({ type: 'text' })
    goalName: string;

    @Column({
        type: 'enum',
        enum:  ['in progress', 'completed', 'failed']
      })
      status: string;
          
    @Column({ type: 'timestamp' })
    deadline: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  }

