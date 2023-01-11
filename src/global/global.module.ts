import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from 'entities/Regions';
import { RegionsController } from 'src/controller/regions/regions.controller';
import { RegionsService } from 'src/service/regions/regions.service';
import { UsersController } from 'src/controller/users/users.controller';
import { UsersService } from 'src/service/users/users.service';
import { Users } from 'entities/Users';
import { AuthController } from 'src/controller/auth/auth.controller';
import { AuthService } from 'src/service/auth/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Regions, Users])],
    controllers: [RegionsController, UsersController, AuthController],
    providers: [RegionsService, UsersService, AuthService],
})

export class GlobalModule {}
