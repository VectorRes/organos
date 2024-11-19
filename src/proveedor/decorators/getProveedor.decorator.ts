import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getProveedor = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // El proveedor autenticado está en `request.user`
  },
);
