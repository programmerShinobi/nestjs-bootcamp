import { UsePipes, ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';
import { IsEmail, IsNumber, IsNotEmpty } from 'class-validator';

export class formsUsers {
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    username: string;
    password: string;
    userFirstname: string;
    userMiddlename: string;
    userLastname: string;

    @IsEmail()
    userEmail: string
}
