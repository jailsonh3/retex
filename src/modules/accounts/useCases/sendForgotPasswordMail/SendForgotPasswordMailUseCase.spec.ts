import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let dateProvider: DayjsDateProvider;

describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it('should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

        await usersRepositoryInMemory.create({
            name: 'Lewis Martin',
            email: 'wamza@tazfom.cu',
            driver_license: '566269',
            password: '1234',
        });

        await sendForgotPasswordMailUseCase.execute('wamza@tazfom.cu');

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('ikhorpaj@bi.eh')
        ).rejects.toEqual(new AppError('User does not exists!'));
    });

    it('should be able to create an users token', async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            'create'
        );

        await usersRepositoryInMemory.create({
            name: 'Lewis Martin',
            email: 'ge@pi.hr',
            driver_license: '856499',
            password: '1234',
        });

        await sendForgotPasswordMailUseCase.execute('ge@pi.hr');

        expect(generateTokenMail).toBeCalled();
    });
});
