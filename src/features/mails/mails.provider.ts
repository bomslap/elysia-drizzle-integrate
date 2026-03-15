import { createTransport, SendMailOptions, Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";

export abstract class MailService {
  protected transporter: Transporter
  protected from: string

  constructor(transporterOptions: SMTPTransport.Options, from: string) {
    this.transporter = createTransport(transporterOptions);
    this.from = from;
  }

  async send(options: SendMailOptions) {
    await this.transporter.sendMail({
      from: this.from,
      ...options
    })
  }
}