import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OfferPost {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: Number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    tags: string[];
}