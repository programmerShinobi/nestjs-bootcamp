import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }from 'typeorm'
import { Regions } from '../../../entities/Regions';

@Injectable()
export class RegionsService {
    constructor(
        @InjectRepository(Regions) // @ : decorator
        private RegionRepository: Repository<Regions>,
    ) {}

    async findAll(): Promise<any> { // Promise<any> is collection, not data type, because use async await
        return await this.RegionRepository.find();
    }

    // async findAll(): Promise<any> {
    //     return this.regionRepository.find();
    // }

    getHello(): string {
        return `alhamdulillah bisa`;
    }

    // findAll(): any { // Promise<any> is collection, not data type, because use async await
    //     return  this.regionRepository.find();
    // }
}
