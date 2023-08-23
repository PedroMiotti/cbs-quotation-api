import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    weight: string;

    @ApiProperty()
    is_active: boolean;

    @ApiProperty()
    brand_id: number;
}
