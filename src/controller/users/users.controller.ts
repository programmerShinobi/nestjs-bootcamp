import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Req, Res } from '@nestjs/common/decorators';
import { UsersService } from 'src/service/users/users.service';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthService } from 'src/service/auth/auth.service';
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { formsUsers } from 'pipes/validation.pipe';
// import { AuthService } from 'src/service/auth/auth.service';


// @UseGuards(AuthService)

@Controller()
export class UsersController {
    constructor(private UsersService: UsersService,
        // private authService: AuthService
    ) { }

    @Get('users')
    findAll(@Req() req, @Res() res) {
        return this.UsersService.findAll(req, res);
    }

    @Get('users/:id')
    findOne(@Param() params, @Req() req, @Res() res) {
        return this.UsersService.findOne(params.id, req, res);
    }

    @Post('users')
    create(@Body() body, @Req() req, @Res() res) {
        return this.UsersService.create(body, req, res);
    }

    @Put('users/:id') 
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id') id: number, @Body() body: any, @Req() req, @Res() res) {
        return this.UsersService.update(id, body, req, res)
    }

    // @Delete('users/:id')
    // remove(@Param('id') id: number, @Req() req, @Res() res) {
    //     return this.UsersService.delete(id, req, res);
    // }

    @Delete('users/:id')
    remove(@Param('id') id: number ) {
        return this.UsersService.delete(id);
    }

    // @Post('/login')
    // login(@Body() body, @Req() req, @Res() res) {
    //     return this.authService.login(body, req, res);
    // }
    
}
