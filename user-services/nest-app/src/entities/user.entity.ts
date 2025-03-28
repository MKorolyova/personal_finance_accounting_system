import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ unique: true })
    password: string;
  
    @Column({ unique: true })
    username: string;
      
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }