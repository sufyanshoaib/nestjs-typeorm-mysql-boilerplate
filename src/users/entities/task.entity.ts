import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;  

    /**
     * FK to User, on delete of User, set this user field to null
     */
    @ManyToOne(() => User, user => user.tasks, {onDelete: 'SET NULL'})
    user: User;
}