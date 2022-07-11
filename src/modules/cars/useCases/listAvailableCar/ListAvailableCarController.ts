import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

class ListAvailableCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, brand, category_id } = request.query;

        const listavailableCarUseCase = container.resolve(
            ListAvailableCarUseCase
        );

        const cars = await listavailableCarUseCase.execute({
            name: name as string,
            brand: brand as string,
            category_id: category_id as string,
        });

        console.log(cars);

        return response.json(cars);
    }
}

export { ListAvailableCarController };
