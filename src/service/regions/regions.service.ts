import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }from 'typeorm'
import { Regions } from '../../../entities/Regions';

@Injectable()
export class RegionsService {
    constructor(
        @InjectRepository(Regions) // @ : decorator
        private regionRepository: Repository<Regions>,
    ) {}

    async findAll(): Promise<any> { // Promise<any> is collection, not data type, because use async await
        return await this.regionRepository.find();
    }

    async findOne(id): Promise<any> {
       return await this.regionRepository.findOneBy({regionId:id})
    }

    async create(items: Regions): Promise<any>  {
        await this.regionRepository.save({
            regionId: items.regionId,
            regionName: items.regionName
        });
        return "Data inserted";
    }

    async update(id: number, data: Regions): Promise<any>{
        await this.regionRepository.update(
            { regionId: id },
            { regionName: data.regionName });
        return "Data updated";
    }

    async delete(id: number): Promise<any> {
        await this.regionRepository.delete({ regionId: id });
        return "Data deleted";
    }
}
