import { ApiProperty } from "@nestjs/swagger";

export class CreateProductPriceDto {
    @ApiProperty()
    product_id: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    is_current: boolean;
}
