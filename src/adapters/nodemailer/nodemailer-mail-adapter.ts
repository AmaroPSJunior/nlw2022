import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "cfa73f61738d09",
      pass: "d947409a8e176e"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ body, subject }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Amaro <amaro@amaro.com>',
            to: 'Amaro Silva <arcamos.j@gmail.com>',
            subject,
            html: body,
        });
    };
}