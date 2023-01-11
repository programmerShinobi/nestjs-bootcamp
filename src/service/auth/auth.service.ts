import { HttpStatus, Injectable, CanActivate, ExecutionContext, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import { JwtAuthGuard } from '@nestjs/jwt'
// import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthService implements CanActivate {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) { }
    
    async findUsername(username:any): Promise<any>{
        return await this.userRepository
            .findOneBy({username: username});
    }

    async login(data: Users, req:any, res: any): Promise<Users>{
        await this.findUsername(data.username).then(async (user) => {
            if (user.username == data.username) {
                const compare = await bcrypt.compare(data.password, user.password);
                if (!compare) {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: "Invalid password"})
                } else {
                    const payload = {
                        userId: user.userId,
                        username: user.username,
                        password: user.password,
                        userFirstname: user.userFirstname,
                        userMiddlename: user.userMiddlename,
                        userLastname: user.userLastname,
                        userEmail: user.userEmail
                    };
        
                    const token = await jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {expiresIn: '2m'}
                    );
                    res.status(HttpStatus.OK).send({
                        message: "User login successfully",
                        userdata: payload,
                        _token: token
                    })
                }
            }            
        }).catch(() => {
            res.status(HttpStatus.NOT_FOUND).send({
                message: "Invalid username"
            })
        });
        return
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            request.userData = decoded;
            return true;
        } catch (error) {
            return false;
        }
    }
}
