import { Controller, Body, Post, Req, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';

@Controller()
export class AuthController {
    constructor(private AuthService: AuthService) { }
    
    @Post('/login')
    @UsePipes(new ValidationPipe({ transform: true }))
    login(@Body() body, @Req() req, @Res() res) {
        return this.AuthService.login(body, req, res);
    }

}

