import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';
import path from 'path';
import { Observable, of } from 'rxjs';

@Controller('assets')
export class AssetsController {

  constructor() {
  }

  @Get('avatar/:path')
  getAvatar(@Param('path') path: string, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads', 'avatars', path)));
  }

  @Get('background/:path')
  getGameBackground(@Param('path') path: string, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads', 'backgrounds', path)));
  }

}
