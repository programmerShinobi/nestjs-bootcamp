import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res } from '@nestjs/common';
import {  RegionsService } from 'src/service/regions/regions.service';
import { AuthService } from 'src/service/auth/auth.service';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('regions')
export class RegionsController {
  constructor(private RegionsService: RegionsService) { }
  
    @UseGuards(AuthService)
    @Get()
    findAll(@Req() req, @Res() res) {
      return this.RegionsService.findAll(req,res);
    }
    
    @UseGuards(AuthService)
    @Get(':id')
    findOne(@Param() params, @Req() req, @Res() res){
      return  this.RegionsService.findOne(params.id, req, res);
    }
    
    @UseGuards(AuthService)
    @Post()
    create(@Body() body, @Req() req, @Res() res){
      return this.RegionsService.create(body, req, res);
    }
    
    @UseGuards(AuthService)
    @Put(':id')
    update(@Param('id') id: number, @Body() body: any, @Req() req, @Res() res) {
      return this.RegionsService.update(id, body, req, res);
    }
    
    @UseGuards(AuthService)
    @Delete(':id')
    remove(@Param('id') id: number, @Req() req, @Res() res) {
      return this.RegionsService.delete(id, req, res);
    }

}
