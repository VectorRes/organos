import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginProveedorDto } from './dto/loginProveedor-dto';

@Injectable()
export class ProveedorService {
  constructor(@InjectRepository(Proveedor) private readonly proveedorRepository: Repository<Proveedor>,
  private readonly jwtService: JwtService){}
  async create(createProveedorDto: CreateProveedorDto) {
    try{
      const proveedor = this.proveedorRepository.create(createProveedorDto);
      proveedor.contrasena = await bcrypt.hash(proveedor.contrasena, 10);
      await this.proveedorRepository.save(proveedor);
      const {nombre, correoElectronico} = proveedor;
      return {proveedor: {nombre, correoElectronico}};
    }
    catch(err){
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  async findAll() {
    const proveedor= await this.proveedorRepository.find();
    return proveedor;
  }

  async findOne(id: string) {
    const proveedor= await this.proveedorRepository.findOneBy({id:id});
    if(!proveedor){
      throw new NotFoundException("No se ha encontrado al proveedor");
    }
    return proveedor;
  }

  async update(id: string, updateProveedorDto: UpdateProveedorDto) {
    const proveedor= await this.proveedorRepository.preload({id:id, ...updateProveedorDto});
    if(!proveedor){
      throw new NotFoundException("No se ha encontrado al proveedor");
    }
    await this.proveedorRepository.save(proveedor);
    return proveedor;
  }

  async remove(id: string) {
    const proveedor= await this.proveedorRepository.delete({id: id});
    return proveedor;
  }

  async login(loginProveedorDto: LoginProveedorDto) {
    try{
      const {correoElectronico, contrasena} = loginProveedorDto;
      const proveedor = await this.proveedorRepository.findOneBy({correoElectronico});
      if(!proveedor){
        throw new UnauthorizedException('Invalid credentials');
      }
      const isValid = bcrypt.compareSync(contrasena, proveedor.contrasena);
      if(!isValid){
        throw new UnauthorizedException('Invalid credentials');
      }
      const {nombre, id} = proveedor;
      const jwt = this.jwtService.sign({nombre, correoElectronico, id});
      
      return {proveedor: {nombre, correoElectronico, id, jwt}};
    }
    catch(err){
      console.log(err);
      throw new UnauthorizedException(err.detail);
    }
    
  }

}
