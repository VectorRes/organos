import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GarantiaService } from './garantia.service';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';
import { ProveedorJwtAuthGuard } from 'src/guards/guards';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('garantia') // Para agrupar los endpoints relacionados con 'garantia'
@Controller('garantia')
export class GarantiaController {
  constructor(private readonly garantiaService: GarantiaService) {}

  @ApiOperation({ summary: 'Crear una nueva garantía' })
  @ApiBearerAuth() // Indica que se requiere autenticación con JWT
  @ApiResponse({ status: 201, description: 'La garantía ha sido creada con éxito.' })
  @UseGuards(ProveedorJwtAuthGuard)
  @Post()
  create(@Body() createGarantiaDto: CreateGarantiaDto) {
    return this.garantiaService.create(createGarantiaDto);
  }

  @ApiOperation({ summary: 'Obtener todas las garantías' })
  @ApiResponse({ status: 200, description: 'Lista de todas las garantías.' })
  @Get()
  findAll() {
    return this.garantiaService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una garantía por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la garantía solicitada.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.garantiaService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar una garantía por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'La garantía ha sido actualizada con éxito.' })
  @UseGuards(ProveedorJwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGarantiaDto: UpdateGarantiaDto) {
    return this.garantiaService.update(id, updateGarantiaDto);
  }

  @ApiOperation({ summary: 'Eliminar una garantía por ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'La garantía ha sido eliminada con éxito.' })
  @UseGuards(ProveedorJwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.garantiaService.remove(id);
  }
}
