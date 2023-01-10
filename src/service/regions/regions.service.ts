import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }from 'typeorm'
import { Regions } from '../../../entities/Regions';

@Injectable()
export class RegionsService {
    constructor(
        @InjectRepository(Regions) // @ : decorator
        private regionRepository: Repository<Regions>
    ) {}

    async findAll(): Promise<any> { // Promise<any> is collection, not data type, because use async await
        return await this.regionRepository.find();
    }

    async findOne(id): Promise<any> {
       return await this.regionRepository.findOneBy({regionId:id})
    }

    async create(data: Regions): Promise<any>  {

        // Create a new region object
        const newRegion = new Regions();
        newRegion.regionId = data.regionId;
        newRegion.regionName = data.regionName;

        // Save the new region object to the database
        await this.regionRepository.save(newRegion);

        // Return the saved user object
        return newRegion;
    }

    async update(id: number, data: Regions): Promise<any>{
        
        // Update a region object
        const regionUpdate = new Regions();
        regionUpdate.regionName = data.regionName;

        // Update the new region object to the database
        await this.regionRepository.update({ regionId: id },regionUpdate);
        
        // Return the updated user object
        return regionUpdate;
    }

    async delete(id: number): Promise<any> {
        await this.regionRepository.delete({ regionId: id });
        
        // Return the updated region object
        return `Data Region with ID : ${id} deleted`;
    }
}
