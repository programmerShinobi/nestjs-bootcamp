import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'entities/Users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) {}

    async findAll(): Promise<any> {
       return await this.userRepository.find();
    }  

    async findOne(id): Promise<any> {
        return await this.userRepository.findOneBy({userId:id})
    }

    async create(data: Users): Promise<Users> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Create a new user object with the hashed password
        const newUser = new Users();
        newUser.username = data.username;
        newUser.password = hashedPassword;
        newUser.userFirstname = data.userFirstname;
        newUser.userMiddlename = data.userMiddlename;
        newUser.userLastname = data.userLastname;
        newUser.userEmail = data.userEmail;
    
        // Save the new user object to the database
        await this.userRepository.save(newUser);

        // Return the saved user object
        return newUser;
    }

    async update(id: number, data: Users): Promise<any>{
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
        await this.userRepository.update({ userId: id }, userUpdate);
        
        // Return the updated user object
        return userUpdate;
    }

    async delete(id: number): Promise < any > {
        await this.userRepository.delete({ userId: id });
        
        // Return the delted user object
        return `Data User with ID : ${id} deleted`;
    }


}
