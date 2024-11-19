import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { LoginProveedorDto } from './dto/loginProveedor-dto';
import { UseGuards } from '@nestjs/common';
import { ProveedorJwtAuthGuard } from 'src/guards/guards';
import { OwnProveedorDataGuard } from './guard/ownProveedorData.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from '@nestjs/common';

@ApiTags('proveedores')  // Etiqueta general para el grupo de endpoints
@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @ApiOperation({ summary: 'Crear un nuevo proveedor' })
  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedorService.create(createProveedorDto);
  }

  @ApiOperation({ summary: 'Obtener todos los proveedores' })
  @Get()
  findAll() {
    return this.proveedorService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un proveedor por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedorService.findOne(id);
  }

  @ApiBearerAuth()  // Indica que este endpoint requiere autenticación JWT
  @ApiOperation({ summary: 'Actualizar un proveedor' })
  @Patch(':id')
  @UseGuards(ProveedorJwtAuthGuard, OwnProveedorDataGuard)
  update(@Param('id') id: string, @Body() updateProveedorDto: UpdateProveedorDto) {
    return this.proveedorService.update(id, updateProveedorDto);
  }

  @ApiOperation({ summary: 'Iniciar sesión como proveedor' })
  @Post('login')
  login(@Body() loginProveedorDto: LoginProveedorDto) {
    return this.proveedorService.login(loginProveedorDto);
  }

  @UseGuards(ProveedorJwtAuthGuard) // Usar el guard JWT para validar al proveedor
  @Get('me')
  getAuthenticatedProveedor(@Request() req) {
    return req.user; // Retorna los datos del proveedor autenticado
  }
}
