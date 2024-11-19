import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class OwnClienteDataGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    const clienteId = request.params.id;

    if (user.id !== clienteId) {
      throw new ForbiddenException('No puedes actualizar la informacion de otro cliente');
    }

    return true;
  }
}
