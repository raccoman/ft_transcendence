import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

@Controller('profile')
export class ProfileController {

  constructor() {
  }

  @Get('avatar/:path')
  async signin(
    @Param('path') path: string,
    @Res() response: Response,
  ) {
    try {
      const file = createReadStream(join(process.cwd(), 'uploads', path));
      file.pipe(response);
    } catch (exception) {
      response.status(404).end();
    }
  }

}
