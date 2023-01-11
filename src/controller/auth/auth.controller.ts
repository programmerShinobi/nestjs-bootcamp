import { Controller, Body, Post, Req, Res} from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';

@Controller()
export class AuthController {
    constructor(private AuthService: AuthService) { }
    
    @Post('/login')
    login(@Body() body, @Req() req, @Res() res) {
        return this.AuthService.login(body, req, res);
    }

}

