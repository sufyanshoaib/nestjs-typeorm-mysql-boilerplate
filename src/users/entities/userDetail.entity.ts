import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    facebookId: string;    

    @Column({nullable:true})
    twitterId: string;

    @Column({nullable:true})
    instagramId: string;

    /**
     * Helps in directly getting the userId, instead of querying for user to get the id
     */
    @Column({name:'user_id'})
    userId: number;

    /**
     * Have FK to User table, and do lazy loading of User. Also when User is deleted, cascade that to UserDetail and delete it.
     */
    @OneToOne(() => User, user => user.userDetail, { lazy: true, onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;
}