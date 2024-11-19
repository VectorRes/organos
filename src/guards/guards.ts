import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ClienteJwtAuthGuard extends AuthGuard('jwt-cliente') {}
@Injectable()
export class ProveedorJwtAuthGuard extends AuthGuard('jwt-proveedor') {
  
}
