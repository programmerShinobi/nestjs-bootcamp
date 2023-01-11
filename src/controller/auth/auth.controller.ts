import { Controller, Body, Post, Param, Req, Res} from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('login')
export class AuthController {
    constructor(private AuthService: AuthService) { }
    
    @Post()
    login(@Body() body, @Req() req, @Res() res) {
        return this.AuthService.login(body, req, res);
    }
}
