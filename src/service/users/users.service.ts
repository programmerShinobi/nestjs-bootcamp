import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) {}

    async findAll(req: any, res: any): Promise<any> {
        // return await this.userRepository.find();
        return await this.userRepository
            .query(`
                SELECT * FROM USERS
                ORDER BY user_id DESC
            `).then((result) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                        message: "Data users displayed successfully",
                        results: result
                    });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: "Data users not found"
                    });
                }

            }).catch((err) => {
                res.status(HttpStatus.BAD_GATEWAY).send({
                    message: err.message
                });
            });
    }  

    async findOne(id:number, req: any, res:any): Promise<any> {
        return await this.userRepository.findOneBy({ userId: id })
            .then((result) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                    message: `Data user wiht ID : ${id} displayed successfully`,
                    result: result
                });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                    message: `Data user wiht ID : ${id} not found`
                });
                }
                
            }).catch((err) => {
                res.status(HttpStatus.BAD_GATEWAY).send({
                message: err.message
        })}) 
    }

    async create(data: Users, req: any, res:any): Promise<Users> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Save a user object
        const newUser = new Users();
        newUser.username = data.username;
        newUser.password = hashedPassword;
        newUser.userFirstname = data.userFirstname;
        newUser.userMiddlename = data.userMiddlename;
        newUser.userLastname = data.userLastname;
        newUser.userEmail = data.userEmail;
    
        // Save the new user object to the database
        await this.userRepository.save(newUser)
            .then((result) => {
                if (result) {
                    return res.status(HttpStatus.ACCEPTED).send({
                        message: "Data user inserted successfully",
                        results: result
                    });
                } else {
                    res.status(HttpStatus.NOT_ACCEPTABLE).send({
                        message: "Data user insert failed"
                    });
                }
            }).catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message: err.message
                });
            });

        // Return the saved user object
        return;
    }

    async update(id: number, data: Users, req: any, res: any): Promise<any>{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Update a user object with the hashed password
        const userUpdate = new Users();
        userUpdate.username = data.username;
        userUpdate.password = hashedPassword;
        userUpdate.userFirstname = data.userFirstname;
        userUpdate.userMiddlename = data.userMiddlename;
        userUpdate.userLastname = data.userLastname;
        userUpdate.userEmail = data.userEmail;
    
        // Update the new user object to the database
        await this.userRepository.update({ userId: id }, userUpdate)
            .then((result) => {
                if (result) {
                    res.status(HttpStatus.ACCEPTED).send({
                        message: "Data user updated successfully",
                        result: result
                    });
                } else {
                    res.status(HttpStatus.NOT_ACCEPTABLE).send({
                        message: "Data user update failed"
                    })
                }
                
            }).catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message: err.message
                });
            });
        return;
    }

    async delete(id: number, req: any, res: any): Promise<any> {
            await this.userRepository.delete({ userId: id })
                .then((result) => {
                    if (result) {
                        res.status(HttpStatus.OK).send({
                            message: `Data User with ID : ${id} deleted successfully`
                        });
                    } else {
                        res.status(HttpStatus.NOT_FOUND).send({
                            message: `Data User with ID : ${id} not found`
                        })
                    }
                }).catch((err) => {
                    res.status(HttpStatus.BAD_GATEWAY).send({
                        message: err.message
                    })
                });
    }

}
