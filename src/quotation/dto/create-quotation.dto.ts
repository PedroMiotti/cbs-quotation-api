import { ApiProperty } from "@nestjs/swagger";

export class CreateQuotationDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    type: QuotationType;
    
    @ApiProperty()
    tag: string;
}

export enum QuotationType {
    CHRISTMAS = 'CHRISTMAS',
    CUSTOM = 'CUSTOM',
}
