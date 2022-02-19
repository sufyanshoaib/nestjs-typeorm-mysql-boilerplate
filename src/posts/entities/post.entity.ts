import { ApiProperty } from "@nestjs/swagger";

export class OfferPost {
    @ApiProperty()
    id: Number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    tags: string[];
}