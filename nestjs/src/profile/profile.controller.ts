import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';
import path from 'path';
import { Observable, of } from 'rxjs';

@Controller('profile')
export class ProfileController {

  constructor() {
  }

  @Get('avatar/:path')
  findProfileImage(@Param('path') path: string, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads', path)));
  }

}
