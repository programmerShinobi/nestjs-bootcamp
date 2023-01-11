import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res } from '@nestjs/common';
import {  RegionsService } from 'src/service/regions/regions.service';

@Controller('regions')
export class RegionsController {
    constructor(private RegionsService: RegionsService) {}
    
    @Get()
    findAll(@Req() req, @Res() res) {
      return this.RegionsService.findAll(req,res);
    }
    
    @Get(':id')
    findOne(@Param() params, @Req() req, @Res() res){
      return  this.RegionsService.findOne(params.id, req, res);
    }
    
    @Post()
    create(@Body() body, @Req() req, @Res() res){
      return this.RegionsService.create(body, req, res);
    }
    
    @Put(':id')
    update(@Param('id') id: number, @Body() body: any, @Req() req, @Res() res) {
      return this.RegionsService.update(id, body, req, res);
    }
    
    @Delete(':id')
    remove(@Param('id') id: number, @Req() req, @Res() res) {
      return this.RegionsService.delete(id, req, res);
    }

}
