import { Module } from '@nestjs/common';
import { GarantiaService } from './garantia.service';
import { GarantiaController } from './garantia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garantia } from './entities/garantia.entity';
import { OrganosDisponiblesModule } from 'src/organos-disponibles/organos-disponibles.module';
import { OrganosDisponible } from 'src/organos-disponibles/entities/organos-disponible.entity';

@Module({
  controllers: [GarantiaController],
  providers: [GarantiaService],
  imports: [TypeOrmModule.forFeature([Garantia, OrganosDisponible])],
  exports: [TypeOrmModule]
})
export class GarantiaModule {}
