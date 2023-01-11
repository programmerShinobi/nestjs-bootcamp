import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) { }
    
    async findUsername(username:any): Promise<any>{
        return await this.userRepository
            .findOneBy({username: username});
    }

    async login(data: Users, req:any, res: any): Promise<Users>{
        await this.findUsername(req.username).then(async (user) => {
            if (!user) {
                res.status(HttpStatus.NOT_FOUND).send("Invalid username");
            } else {
                const compare = await bcrypt.compare(data.password, user.password);
                if (!compare) {
                    res.status(HttpStatus.NOT_FOUND).send("Invalid password")
                } else {
                    const payload = {
                        userId: user.id,
                        username: user.username,
                        userFirstname: user.userFirstname,
                        userMiddlename: user.userMiddlename,
                        userLastname: user.userLastname,
                        userEmail: user.userEmail
                    };
        
                    const token = await jwt.sign(payload, process.env.SECRET_KEY);
                    res.status(HttpStatus.OK).send({
                        message: "User login successfully",
                        userdata: payload,
                        _token: token
                    })
                }
    
            }
        });
        return
        
    }


}
