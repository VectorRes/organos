import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwtProveedor.payload'; // Asegúrate de tener esta interfaz
import { Proveedor } from '../entities/proveedor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtProveedorStrategy extends PassportStrategy(Strategy, 'jwt-proveedor') {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_PASSWORD, // Asegúrate de que esta variable esté configurada
      ignoreExpiration: false,  // Puedes agregar esta opción si deseas verificar la expiración del token
    });
  }

  async validate(payload: JwtPayload) {
    console.log('JWT Payload:', payload);
    const { correoElectronico } = payload;
    const proveedor = await this.proveedorRepository.findOneBy({ correoElectronico });
  
    if (!proveedor) {
      console.log('Proveedor no encontrado para:', correoElectronico);
      throw new BadRequestException('Proveedor no encontrado o no autorizado');
    }
  
    return proveedor;
  }
}
