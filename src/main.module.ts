import "dotenv/config";
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalModule } from './global/global.module';

// import { GlobalModule } from '../src/global/global.module';
import { join } from "path";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port:  parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: ["dist/entities/**/*{.ts,.js}"],
      // entities: [join(__dirname, '..', 'entities', '**', '*.{ts,js}')],

      // entities: ["**/*.entities/{.ts,.js}"],
      // entities: ['**/entities/*{.ts,.js}'],

      synchronize: false,
      autoLoadEntities: true
    }),
    GlobalModule,
  ],
})

export class MainModule {}
