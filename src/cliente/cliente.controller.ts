import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { LoginClienteDto } from './dto/loginCliente-dto';
import { ClienteJwtAuthGuard, ProveedorJwtAuthGuard } from 'src/guards/guards';
import { OwnClienteDataGuard } from './guard/ownClienteData.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cliente')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'El cliente ha sido creado con éxito.' })
  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @ApiOperation({ summary: 'Obtener la lista de todos los clientes' })
  @ApiBearerAuth()
  @UseGuards(ProveedorJwtAuthGuard)
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiBearerAuth()
  @UseGuards(ProveedorJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un cliente por ID' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @ApiOperation({ summary: 'Iniciar sesión de cliente' })
  @ApiResponse({ status: 200, description: 'El cliente ha iniciado sesión con éxito.' })
  @Post('login')
  login(@Body() loginClienteDto: LoginClienteDto) {
    return this.clienteService.login(loginClienteDto);
  }
}
