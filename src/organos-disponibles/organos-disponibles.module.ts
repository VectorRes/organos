import { Module } from '@nestjs/common';
import { OrganosDisponiblesService } from './organos-disponibles.service';
import { OrganosDisponiblesController } from './organos-disponibles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganosDisponible } from './entities/organos-disponible.entity';
import { GarantiaModule } from 'src/garantia/garantia.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { Garantia } from 'src/garantia/entities/garantia.entity';
import { ProveedorModule } from 'src/proveedor/proveedor.module';

@Module({
  controllers: [OrganosDisponiblesController],
  providers: [OrganosDisponiblesService],
  imports: [TypeOrmModule.forFeature([OrganosDisponible, Garantia]), GarantiaModule, ClienteModule, ProveedorModule],
})
export class OrganosDisponiblesModule {}
