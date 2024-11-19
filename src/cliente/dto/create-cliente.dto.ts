import { IsDate, IsEmail, IsString, MinLength, MaxLength, Matches, IsDateString, IsInt } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
    
    @ApiProperty({ example: 'Juan Perez', description: 'Nombre completo del cliente' })
    @IsString()
    @MinLength(1)
    nombre: string;

    @ApiProperty({ example: '123456789', description: 'Documento de identidad del cliente' })
    @IsInt()
    documento: number;

    @ApiProperty({ example: 'DNI', description: 'Tipo de documento de identidad del cliente' })
    @IsString()
    @MinLength(1)
    tipoDocumento: string;

    @ApiProperty({ example: 'juan.perez@example.com', description: 'Correo electrónico del cliente' })
    @IsEmail()
    @MinLength(3)
    correoElectronico: string;

    @ApiProperty({ example: 'StrongPassw0rd!', description: 'Contraseña del cliente', minLength: 12, maxLength: 50 })
    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'contraseña muy débil' })
    contrasena: string;

    @ApiProperty({ example: '1990-01-01', description: 'Fecha de nacimiento del cliente', type: 'string', format: 'date' })
    @IsDateString()
    fechaNacimiento: string;

    @ApiProperty({ example: 'Argentina', description: 'País de residencia del cliente' })
    @IsString()
    @MinLength(3)
    pais: string;
}
