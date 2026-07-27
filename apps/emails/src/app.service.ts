import { Injectable } from '@nestjs/common';
import { nodemailer } from 'nodemailer';

@Injectable()
export class AppService {


  getHello(): string {
    return 'Hello World Emails!';
  }

  // async sendEmail(to: string, subject: string, text: string) {
  async sendEmail() {

    const mailOptions = {
      from: 'tales.visgueira@tre-pi.jus.br',
      to: 'talesvisgueira@gmail.com',
      subject: 'TESTE E-mail',
      text: 'Olá, este é o corpo do e-mail enviado do OPENALM!'
    };

    const transporter = nodemailer.createTransport({
      host: '://email.tre-pi.jus.br',
      port: 587,
      secure: false,
      auth: {
        user: 'tales.visgueira@tre-pi.jus.br',
        pass: 'taver5cea8!'
      }
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         return {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: 'Erro no envio do e-mail!'
        }
      } else {
        console.log('E-mail enviado: ' + info.response);
        return {
          status: 'ok',
          timestamp: new Date().toISOString(),
          message: 'E-mail enviado com sucesso!'
        }
      }
    });

  }

}
