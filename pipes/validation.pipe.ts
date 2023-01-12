import { UsePipes, ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class formsUsers {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    username: string;
}
