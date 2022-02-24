import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Task } from "./task.entity";
import { UserDetail } from "./userDetail.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({name:'is_active', default: true})
    isActive: boolean;

    @Column({nullable: true})
    phone: string;

    @OneToOne(() => UserDetail, userDetail => userDetail.user, {eager: true})
    //@JoinColumn({name: 'user_detail_id'}) // No need for JoinColumn as we dont want to have userDetail FK in User table
    userDetail: UserDetail;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({name: 'user_role'})
    roles: Role[];
}
