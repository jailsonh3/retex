import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.user;
        const { id: rental_id } = request.params;

        const devolutionRentalUseCase = container.resolve(
            DevolutionRentalUseCase
        );

        const rental = await devolutionRentalUseCase.execute({
            rental_id,
            user_id,
        });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentalController };
