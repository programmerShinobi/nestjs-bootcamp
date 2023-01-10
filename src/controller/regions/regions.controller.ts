import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import {  RegionsService } from 'src/service/regions/regions.service';

@Controller('regions')
export class RegionsController {
    constructor(private RegionsService: RegionsService) {}
    
    @Get()
    findAll() {
      return this.RegionsService.findAll();
    }
    
    @Get(':id')
    findOne(@Param() params){
      return  this.RegionsService.findOne(params.id);
    }
    
    @Post()
    create(@Body() body){
      return this.RegionsService.create(body);
    }
    
    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
      return this.RegionsService.update(id, body)
    }
    
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.RegionsService.delete(id);
    }

}
