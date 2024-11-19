import { Injectable } from '@nestjs/common';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Garantia } from './entities/garantia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GarantiaService {
  constructor(@InjectRepository(Garantia) private readonly garantiaRepository: Repository<Garantia>){}
  async create(createGarantiaDto: CreateGarantiaDto) {
    const garantia= await this.garantiaRepository.create(createGarantiaDto);
    await this.garantiaRepository.save(garantia);
    return garantia;
  }

  async findAll() {
    const garantia= await this.garantiaRepository.find();
    return garantia;
  }

  async findOne(id: string) {
    const garantia= await this.garantiaRepository.findOneBy({id:id});
    if(!garantia){
      throw new NotFoundException("Organo no encontrado")
    }
    return garantia;
  }

  async update(id: string, updateGarantiaDto: UpdateGarantiaDto) {
    const garantia= await this.garantiaRepository.preload({id:id, ...updateGarantiaDto});
    if(!garantia){
      throw new NotFoundException("Organo no encontrado")
    }
    await this.garantiaRepository.save(garantia);
    return garantia;
  }

  async remove(id: string) {
    const garantia= await this.garantiaRepository.delete({id:id});
    return garantia;
  }
}
