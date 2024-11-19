import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginClienteDto } from './dto/loginCliente-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClienteService {
  constructor(@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
  private readonly jwtService: JwtService){}
  async create(createClienteDto: CreateClienteDto) {
    try{
      const cliente = new Cliente();
      cliente.nombre = createClienteDto.nombre;
      cliente.documento = createClienteDto.documento;
      cliente.tipoDocumento = createClienteDto.tipoDocumento;
      cliente.correoElectronico = createClienteDto.correoElectronico;
      cliente.contrasena = createClienteDto.contrasena;
      cliente.fechaNacimiento = new Date(createClienteDto.fechaNacimiento); // Asegúrate de convertirlo a Date
      cliente.pais = createClienteDto.pais;
      cliente.contrasena = await bcrypt.hash(cliente.contrasena, 10);
      await this.clienteRepository.save(cliente);
      const {nombre, correoElectronico} = cliente;
      return {user: {nombre, correoElectronico}};
    }
    catch(err){
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  async findAll() {
    const cliente= await this.clienteRepository.find();
    return cliente;
  }

  async findOne(id: string) {
    const cliente= await this.clienteRepository.findOneBy({id: id});
    if(!cliente){
      throw new NotFoundException("No se ha encontrado al cliente")
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente= await this.clienteRepository.preload({id: id, ...updateClienteDto})
    if(!cliente){
      throw new NotFoundException("No se ha encontrado al cliente")
    }
    await this.clienteRepository.save(cliente);
    return cliente
  }

  async remove(id: string) {
    const cliente= await this.clienteRepository.delete({id: id});
    return cliente;
  }

  async login(loginClienteDto: LoginClienteDto) {
    try{
      const {correoElectronico, contrasena} = loginClienteDto;
      const cliente = await this.clienteRepository.findOneBy({correoElectronico});
      if(!cliente){
        throw new UnauthorizedException('Invalid credentials');
      }
      const isValid = bcrypt.compareSync(contrasena, cliente.contrasena);
      if(!isValid){
        throw new UnauthorizedException('Invalid credentials');
      }
      const {nombre, id} = cliente;
      const jwt = this.jwtService.sign({nombre, correoElectronico, id})
      
      return {user: {nombre, correoElectronico, id, jwt}};
    }
    catch(err){
      console.log(err);
      throw new UnauthorizedException(err.detail);
    }
    
  }


}
