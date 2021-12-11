import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Plan } from './plan.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Plan, plan => plan.user)
    todolist: Plan[];
}
