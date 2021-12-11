import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @Column({ default: false })
    done: boolean;

    @ManyToOne(() => User, user => user.todolist)
    user: User;

    @CreateDateColumn()
    created_at: Date;
        
    @UpdateDateColumn()
    updated_at: Date;
}