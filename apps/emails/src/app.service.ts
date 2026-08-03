import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


const SMTP_HOST = process.env.SMTP_HOST ?? 'smtp.email.com.br' ;
const SMTP_PORT = process.env.SMTP_PORT ?? 465
const SMTP_USER = process.env.SMTP_USER ?? 'user@email.com.br'
const SMTP_PASS = process.env.SMTP_PASS ?? 'password'

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World App Emails!';
  }

  // async sendEmail(to: string, subject: string, text: string) {
  async sendEmail(fromUser: string , toUser: string, subject: string, message: string) {

    this.logger.log(`Enviando e-mail de: ${fromUser} para: ${toUser} com assunto: ${subject} e mensagem: ${message}`);

    const mailOptions = {
      from: fromUser,
      to: toUser,
      subject: subject,
      text: message
    };

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logger.error(`Erro ao enviar e-mail do ${fromUser} para ${toUser}: ${error}`);
        return {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: 'Erro no envio do e-mail!'
        }
      } else {
        this.logger.log('E-mail enviado: ' + info.response);
        return {
          status: 'ok',
          timestamp: new Date().toISOString(),
          message: 'E-mail enviado com sucesso!'
        }
      }
    });

  }

}
