import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtClientStrategy } from './strategy/jwtClient.strategy';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, JwtClientStrategy],
  imports: [TypeOrmModule.forFeature([Cliente]),
  PassportModule.register({Strategy: 'jwtClient'}),
  JwtModule.registerAsync({
    imports:[],
    inject:[],
    useFactory: async()=>{
      return {
        secret: process.env.SECRET_PASSWORD,
        signOptions: {expiresIn: '1h'}
      }
    }
  }
  )],
  exports: [PassportModule, JwtModule,JwtClientStrategy,TypeOrmModule, ClienteService]
})
export class ClienteModule {}
