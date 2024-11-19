import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwtClient.payload";
import { Cliente } from "../entities/cliente.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class JwtClientStrategy extends PassportStrategy(Strategy, 'jwt-client'){
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository:Repository<Cliente>
    ){
        super({
            secretOrKey:process.env.SECRET_PASSWORD,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    async validate(payload:JwtPayload){
        const {correoElectronico}=payload;

        const cliente=await this.clienteRepository.findOneBy({correoElectronico});
        if(!cliente){
            throw new BadRequestException("Unauthorized");
        }
        
        return cliente;
    }
}