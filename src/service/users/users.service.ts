import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common/enums';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { formsUsers } from 'pipes/validation.pipe';
import { IsEmail, IsEmpty, IsNumber, isNumber } from 'class-validator';
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
                res.status(HttpStatus.BAD_REQUEST).send({
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
                res.status(HttpStatus.BAD_REQUEST).send({
                message: err.message
        })}) 
    }

    async create(data: Users, req: any, res: any): Promise<Users> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);
    
        return await this.userRepository.save({
            username : data.username,
            password : hashedPassword,
            userFirstname : data.userFirstname,
            userMiddlename : data.userMiddlename,
            userLastname : data.userLastname,
            userEmail : data.userEmail,
        }).then((result) => {
            if (result) {
                return res.status(HttpStatus.OK).send({
                    message: "Data user inserted successfully",
                    results: result
                });
            } else {
                res.status(HttpStatus.EXPECTATION_FAILED).send({
                    message: "Data user insert failed"
                });
            }
        }).catch((err) => {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: err.message
            });
        });
    }

    async update(id: number, data: Users, req: any, res:any): Promise<any>{
        
        // Update a user object with the hashed password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);

        await this.userRepository.update(id, {
            username : data.username,
            password : hashedPassword,
            userFirstname : data.userFirstname,
            userMiddlename : data.userMiddlename,
            userLastname : data.userLastname,
            userEmail : data.userEmail,
        })
        .then(async (result) => {
            if (result) {
                let dataUpdated = await this.userRepository.findOneBy({ userId: id });
                return res.status(HttpStatus.OK).send({
                    message: "Data user updated successfully",
                    results: dataUpdated
                });
            } else {
                return res.status(HttpStatus.EXPECTATION_FAILED).send({
                    message: "Data user update failed"
                });
            }
        })
        .catch((err) => {
            return res.status(HttpStatus.BAD_REQUEST).send({
                message: err.message
            });
        });
    }

    // async delete(id: number, req: any, res: any): Promise<any> {
    //     let resultDelete = await this.userRepository.findOneBy({ userId: id })
        
    //     if (!resultDelete) {
    //         throw new NotFoundException(`Data user with ID: ${id} not found`);
    //     }
        
    //     await this.userRepository.delete({ userId: id })
    //         .then((result) => {
    //             if (result) {
    //                 res.status(HttpStatus.OK).send({
    //                     message: `Data user with ID : ${id} deleted successfully`
    //                 });
    //             } else {
    //                 res.status(HttpStatus.NOT_FOUND).send({
    //                     message: `Data user with ID : ${id} not found`
    //                 })
    //             }
    //         }).catch((err) => {
    //             res.status(HttpStatus.BAD_REQUEST).send({
    //                 message: err.message
    //             })
    //         });
    //     return
    // }
    
    async delete(id: number): Promise<any> {
        if (isNumber(id)) {
            let findId = await this.userRepository.findOneBy({ userId: id })
            if (!findId) {
                throw new NotFoundException(`Data user with ID: ${id} not found`);
            }        
        } else {
            throw new BadRequestException(`Data with ID: ${id} must be number`+isNumber(id));
        }

        let deleteData = await this.userRepository.delete({ userId: id });
        return deleteData;
    }

    async login(data: Users) {
        await this.findEmail(data.userEmail).then(async (user) => {
            // const compare = await bcrypt.compare()
        })
    }

}
