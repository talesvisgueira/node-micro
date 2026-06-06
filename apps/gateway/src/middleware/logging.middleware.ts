import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: () => void) {
      const { method, originalUrl, ip } = req;
      const userAgent = req.get('user-agent') || '';
      const startTime = Date.now();

      Logger.log(
        `Request: ${method} ${originalUrl} - User Agent: ${userAgent} - IP: ${ip}`,
        'LoggingMiddleware',
      );

      res.on('error', (error) => {
      Logger.error(
        `Error Response: ${method} ${originalUrl} - User Agent: ${userAgent} -
        IP: ${ip} - Error: ${error.message}`, 'LoggingMiddleware',
      );
      });

      res.on('finish', () => {
        const { method, originalUrl } = req;
        const statusCode = res.statusCode;
        const contentLength = res.get('content-length') || 0;
        const duration = Date.now() - startTime;
        Logger.log( `Response: ${method} ${originalUrl} - Status: ${statusCode} -
                  Content Length: ${contentLength} - Duration: ${duration}ms`,
                  'LoggingMiddleware',
      );

      if (statusCode >= 400 ) {
        Logger.log( `Response: ${method} ${originalUrl} - Status: ${statusCode} -
                    Duration: ${duration}ms`, 'LoggingMiddleware',
      );

      }
    });

    next();
  }

}