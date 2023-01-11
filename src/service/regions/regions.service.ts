import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }from 'typeorm'
import { Regions } from '../../../entities/Regions';

@Injectable()
export class RegionsService {
    constructor(
        @InjectRepository(Regions) // @ : decorator
        private regionRepository: Repository<Regions>
    ) {}

    async findAll(req: any, res: any): Promise<any> { // Promise<any> is collection, not data type, because use async await
        // return await this.regionRepository.find();
        return await this.regionRepository
            .query(`
                SELECT * FROM regions
                ORDER BY region_id DESC
            `).then((result) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                        message: "Data displayed successfully",
                        results: result
                    });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: "Data not found"
                    });
                }
            }).catch((err) => {
                res.status(HttpStatus.BAD_GATEWAY).send({
                    message: err.message
                });
            });
    }

    async findOne(id, req: any, res: any): Promise<any> {
        return await this.regionRepository.findOneBy({ regionId: id })
            .then((result) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                        message: "Data displayed successfully",
                        results: result
                    });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: "Data not found"
                    })
                }
            }).catch((err) => {
                res.status(HttpStatus.BAD_GATEWAY).send({
                    message: err.message
                });
        })
    }

    async create(data: Regions, req:any, res:any): Promise<any>  {

        // Create a new region object
        const newRegion = new Regions();
        newRegion.regionId = data.regionId;
        newRegion.regionName = data.regionName;

        // Save the new region object to the database
        await this.regionRepository.save(newRegion)
            .then((result) => {
                if (result) {
                    res.status(HttpStatus.ACCEPTED).send({
                        message: "Data inserted successfully",
                        results: result
                    });
                } else {
                    res.status(HttpStatus.NOT_ACCEPTABLE).send({
                        message: "Data insert failed"
                    })
                }
            }).catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message: err.message
                })
            });

        // Return the saved user object
        return;
    }

    async update(id: number, data: Regions, req: any, res:any): Promise<any>{
        
        // Update a region object
        const regionUpdate = new Regions();
        regionUpdate.regionName = data.regionName;

        // Update the new region object to the database
        await this.regionRepository.update({ regionId: id }, regionUpdate)
            .then((result) => {
                if (result) {
                    res.status(HttpStatus.ACCEPTED).send({
                        message: "Data updated successfully",
                        result: result
                    });
                } else {
                    res.status(HttpStatus.NOT_ACCEPTABLE).send({
                        message: "Data update failed"
                    });
                }
            }).catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).send({
                    message: err.message
                });
            });
        

        // Return the updated user object
        return;
    }

    async delete(id: number, req: any, res:any ): Promise<any> {
        await this.regionRepository.delete({ regionId: id })
            .then((result) => {
                if (result) {
                    res.status(HttpStatus.OK).send({
                        message: `Data Region with ID : ${id} deleted`
                    });
                } else {
                    res.status(HttpStatus.NOT_FOUND).send({
                        message: `Data Region with ID : ${id} not found`
                    })
                }
            }).catch((err) => {
                res.status(HttpStatus.BAD_GATEWAY).send({
                    message: err.message
                });
            });
        
        // Return the updated region object
        return;
    }
}
