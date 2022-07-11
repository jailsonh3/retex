import { inject, injectable } from 'tsyringe';

import { ISpecificationRespository } from '@modules/cars/repositories/ISpecificationRespository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationRepository')
        private specificationRepository: ISpecificationRespository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadExists =
            await this.specificationRepository.findByName(name);

        if (specificationAlreadExists) {
            throw new AppError('Specification alread exists.');
        }

        await this.specificationRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
