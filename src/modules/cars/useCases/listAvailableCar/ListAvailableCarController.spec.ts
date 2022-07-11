import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

let listavailableCarUseCase: ListAvailableCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listavailableCarUseCase = new ListAvailableCarUseCase(
            carsRepositoryInMemory
        );
    });

    it('should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car01',
            description: 'Car descrition',
            daily_rate: 110.0,
            license_plate: 'DEF-1232',
            fine_amount: 30,
            brand: 'car-brand',
            category_id: 'category_id',
        });

        const cars = await listavailableCarUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car02',
            description: 'Car descrition',
            daily_rate: 110.0,
            license_plate: 'DEF-1233',
            fine_amount: 30,
            brand: 'car-brand-test',
            category_id: 'category_id',
        });

        const cars = await listavailableCarUseCase.execute({
            brand: 'car-brand-test',
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car03',
            description: 'Car descrition',
            daily_rate: 110.0,
            license_plate: 'DEF-1235',
            fine_amount: 30,
            brand: 'car-brand-test',
            category_id: 'category_id',
        });

        const cars = await listavailableCarUseCase.execute({
            name: 'Car03',
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car04',
            description: 'Car descrition',
            daily_rate: 110.0,
            license_plate: 'DEF-1235',
            fine_amount: 30,
            brand: 'car-brand-test',
            category_id: '12345',
        });

        const cars = await listavailableCarUseCase.execute({
            category_id: '12345',
        });

        expect(cars).toEqual([car]);
    });
});
