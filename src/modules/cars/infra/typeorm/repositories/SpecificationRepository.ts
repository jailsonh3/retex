import { getRepository, Repository } from 'typeorm';

import {
    ICreateSpecificationDTO,
    ISpecificationRespository,
} from '@modules/cars/repositories/ISpecificationRespository';

import { Specification } from '../entities/Specification';

class SpecificationRepository implements ISpecificationRespository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }

    async list(): Promise<Specification[]> {
        const repositories = await this.repository.find();
        return repositories;
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);
    }
}

export { SpecificationRepository };
