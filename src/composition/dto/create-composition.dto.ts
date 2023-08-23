import { ApiProperty } from "@nestjs/swagger";

export class CreateCompositionDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    margin: number;

    @ApiProperty()
    quotation_id: number
}
