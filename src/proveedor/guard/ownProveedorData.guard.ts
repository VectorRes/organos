import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class OwnProveedorDataGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    const proveedorId = request.params.id; 

    if (user.id !== proveedorId) {
      throw new ForbiddenException('No puedes actualizar la información de otro proveedor');
    }

    return true;
  }
}
