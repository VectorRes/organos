import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginProveedorDto {
    @ApiProperty({ example: 'proveedor@ejemplo.com', description: 'Correo electrónico del proveedor' })
    @IsString()
    @IsEmail()
    correoElectronico: string;

    @ApiProperty({ example: 'Password123!', description: 'Contraseña del proveedor', minLength: 12, maxLength: 50 })
    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an Uppercase, lowercase letter and a number'
    })
    contrasena: string;
}
