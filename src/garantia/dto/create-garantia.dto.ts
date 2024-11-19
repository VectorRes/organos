import { IsString, MinLength, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateGarantiaDto {

    @ApiProperty({ 
        example: 'Garantía extendida de 2 años', 
        description: 'Descripción de la garantía',
        minLength: 3 
    })
    @IsString()
    @MinLength(3)
    descripcion: string;

    @ApiProperty({ 
        example: 24, 
        description: 'Período de validez de la garantía en meses' 
    })
    @IsNumber()
    periodoDeValidez: number;
}
