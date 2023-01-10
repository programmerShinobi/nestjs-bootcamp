import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService){}

    @Get()
    findAll() {
        return this.UsersService.findAll();
    }

    @Get(':id')
    findOne(@Param() params) {
        return this.UsersService.findOne(params.id);
    }

    @Post()
    create(@Body() body) {
        return this.UsersService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.UsersService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.UsersService.delete(id);
    }

    
}
