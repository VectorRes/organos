import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class CreateProveedorDto {
    @ApiProperty({ example: 'Empresa XYZ', description: 'Nombre del proveedor' })
    @IsString()
    @MinLength(3)
    nombre: string;

    @ApiProperty({ example: 'John Doe', description: 'Nombre de la persona de contacto' })
    @IsString()
    @MinLength(3)
    contacto: string;

    @ApiProperty({ example: 'Calle Falsa 123, Ciudad, País', description: 'Ubicación del proveedor' })
    @IsString()
    @MinLength(3)
    localizacion: string;

    @ApiProperty({ example: 'proveedor@ejemplo.com', description: 'Correo electrónico del proveedor' })
    @IsEmail()
    correoElectronico: string;

    @ApiProperty({ example: 'Password123!', description: 'Contraseña del proveedor', minLength: 12, maxLength: 50 })
    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'contraseña muy debil' })
    contrasena: string;
}
