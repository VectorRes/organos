import { Injectable } from '@nestjs/common';
import { CreateOrganosDisponibleDto } from './dto/create-organos-disponible.dto';
import { UpdateOrganosDisponibleDto } from './dto/update-organos-disponible.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganosDisponible } from './entities/organos-disponible.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { Garantia } from 'src/garantia/entities/garantia.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class OrganosDisponiblesService {
  constructor(
    @InjectRepository(OrganosDisponible)
    private readonly organosRepository: Repository<OrganosDisponible>,
    @InjectRepository(Garantia)
    private readonly garantiaRepository: Repository<Garantia>,
  ) {}

  async create(createOrganosDisponibleDto: CreateOrganosDisponibleDto, proveedor: Proveedor) {
    const organo = this.organosRepository.create({
      ...createOrganosDisponibleDto,
      proveedor, // Asociar el proveedor autenticado
    });
    return this.organosRepository.save(organo);
  }

  findAll() {
    return this.organosRepository.find({ relations: ['proveedor', 'garantia', 'cliente'] });
  }

  findOne(id: string) {
    return this.organosRepository.findOne({
      where: { id },
      relations: ['proveedor', 'garantia', 'cliente'],
    });
  }

  update(id: string, updateOrganosDisponibleDto: UpdateOrganosDisponibleDto) {
    return this.organosRepository.update(id, updateOrganosDisponibleDto);
  }

  remove(id: string) {
    return this.organosRepository.delete(id);
  }

  async agregarGarantia(id: string, garantiaDto: Partial<Garantia>) {
    const organo = await this.organosRepository.findOne({
      where: { id },
      relations: ['garantia'],
    });

    if (!organo) {
      throw new NotFoundException('Órgano no encontrado');
    }

    const nuevaGarantia = this.garantiaRepository.create(garantiaDto);
    await this.garantiaRepository.save(nuevaGarantia);

    organo.garantia = nuevaGarantia;
    return await this.organosRepository.save(organo);
  }
  
}
