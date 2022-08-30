import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticationUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authentication User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticationUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };

        await createUserUseCase.execute(user);

        const result = await authenticationUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate a no existent user', () => {
        expect(async () => {
            await authenticationUserUseCase.execute({
                email: 'false@email.com',
                password: '1234',
            });
        }).rejects.toEqual(new AppError('Email or password incorrect!', 401));
    });

    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '9999',
                email: 'user@user.com',
                password: '1234',
                name: 'User Test Error',
            };

            await createUserUseCase.execute(user);

            await authenticationUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword',
            });
        }).rejects.toEqual(new AppError('Email or password incorrect!', 401));
    });
});
