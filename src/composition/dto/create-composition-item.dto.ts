import { ApiProperty } from "@nestjs/swagger";

export class CreateCompositionItemDto {
    @ApiProperty()
    product_id: number;

    @ApiProperty()
    quantity: number;
}
