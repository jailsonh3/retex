/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

class EtherealMailProvider implements IMailProvider {
    private client: nodemailer.Transporter;

    private async createClient() {
        try {
            nodemailer.createTestAccount((err, account) => {
                this.client = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });
            });
        } catch (err) {
            console.error(`EtherealMailProvider - Error:\n${err}`);
        }
    }

    constructor() {
        this.createClient();
    }

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        if (!this.client) {
            await this.createClient();
        }

        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: 'Rentx <noreplay@rentx.com.br>',
            subject,
            html: templateHTML,
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };
