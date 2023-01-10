import { Controller, Get, Res, HttpStatus, Response } from '@nestjs/common';
import { RegionsService } from 'src/service/regions/regions.service';
// import { RegionsService } from '../../service/regions/regions.service';

@Controller()
export class RegionsController {
    constructor(private RegionsService: RegionsService) {}

    // @Get('regions')
    // async findAll(): Promise<any> {
    //   return await this.RegionsService.findAll();
    // }
  
    @Get('regions')
    findAll(): Promise<any> {
      return this.RegionsService.findAll();
    }
      
    // @Get('regions')
    // async findAll(@Res() Response): Promise<any> {
    //   const result = await this.RegionsService.findAll();
    //   if (result) {
    //     return Response.status(HttpStatus.OK).send(result);
    //   }
    // }
  
    @Get('hellosss')
    async getHello() {
    return await this.RegionsService.getHello();
  }
}
