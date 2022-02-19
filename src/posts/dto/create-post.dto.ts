import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    title: string;

    @ApiProperty({required: false})
    description?: string;

    @ApiProperty()
    tags: string[];
}