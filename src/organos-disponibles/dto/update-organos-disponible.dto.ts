import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganosDisponibleDto } from './create-organos-disponible.dto';

export class UpdateOrganosDisponibleDto extends PartialType(CreateOrganosDisponibleDto) {}
