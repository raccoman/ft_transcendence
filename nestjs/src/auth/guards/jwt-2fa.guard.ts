import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class Jwt2FAGuard extends AuthGuard('jwt-2fa') {

  getRequest(context: ExecutionContext) {

    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      return req;
    }

    const request = context.switchToHttp().getRequest();

    if (context.getType() === 'ws') {
      request['headers'] = request.handshake.headers;
    }

    return request;
  }

}
