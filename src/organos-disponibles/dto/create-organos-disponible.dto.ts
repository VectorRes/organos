import { IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Garantia } from "src/garantia/entities/garantia.entity";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrganosDisponibleDto {

    @ApiProperty({ 
        example: 'Hospital San Pedro', 
        description: 'Procedencia del órgano disponible' 
    })
    @IsString()
    @MinLength(1)
    procedencia: string;

    @ApiProperty({ 
        example: 'Riñón', 
        description: 'Tipo de órgano disponible' 
    })
    @IsString()
    @MinLength(1)
    tipoOrgano: string;

    @ApiProperty({ 
        example: '5000', 
        description: 'Precio del órgano disponible' 
    })
    @IsString()
    precio: string;

    @ApiPropertyOptional({ 
        description: 'Garantía del órgano, si aplica', 
        type: () => Garantia 
    })
    @IsObject()
    @IsOptional()
    garantia: Garantia;
    
    @ApiPropertyOptional({ 
        description: 'Cliente asociado al órgano, si aplica', 
        type: () => Cliente 
    })
    @IsObject()
    @IsOptional()
    cliente: Cliente;
}
