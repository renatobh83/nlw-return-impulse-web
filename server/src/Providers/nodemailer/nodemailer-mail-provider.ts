import { MailAdapter, SendMailData } from "../mail.provider";
import nodemailer from "nodemailer"


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "fec37bea37b4bf",
        pass: "0eb054f371206e"
    }
});
export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ body, subject }: SendMailData) {
        await transport.sendMail({
            to: "Renato <suporte2@exp.net.br>",
            from: "Equipe Feedget <oi@feedget.com>",
            subject,
            html: body
        })
    }
}
