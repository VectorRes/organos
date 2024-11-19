import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginClienteDto {

    @ApiProperty({ example: 'juan.perez@example.com', description: 'Correo electrónico del cliente' })
    @IsString()
    @IsEmail()
    correoElectronico: string;

    @ApiProperty({ example: 'StrongPassw0rd!', description: 'Contraseña del cliente', minLength: 12, maxLength: 50 })
    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an uppercase, lowercase letter and a number'
    })
    contrasena: string;
}
