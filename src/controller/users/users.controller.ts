import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Req, Res } from '@nestjs/common/decorators';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService){}

    @Get()
    findAll(@Req() req, @Res() res) {
        return this.UsersService.findAll(req, res);
    }

    @Get(':id')
    findOne(@Param() params, @Req() req, @Res() res) {
        return this.UsersService.findOne(params.id, req, res);
    }

    @Post()
    create(@Body() body, @Req() req, @Res() res) {
        return this.UsersService.create(body, req, res);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any, @Req() req, @Res() res) {
        return this.UsersService.update(id, body, req, res)
    }

    @Delete(':id')
    remove(@Param('id') id: number, @Req() req, @Res() res) {
        return this.UsersService.delete(id, req, res);
    }
    
}
