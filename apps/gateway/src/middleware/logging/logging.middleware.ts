import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {

  use(req: any, res: any, next: () => void) {
      const { method, originalUrl } = req;
      const userAgent = req.get('user-agent') || '';
      const ip = req.ip || req.connection.remoteAddress;

      Logger.log(
        `Request: ${method} ${originalUrl} - User Agent: ${userAgent} - IP: ${ip}`,
        'LoggingMiddleware',
      );

      res.on('error', (err: any) => {
      Logger.error(
        `Error Response: ${method} ${originalUrl} - User Agent: ${userAgent} -
        IP: ${ip} - Error: ${err.message}`, 'LoggingMiddleware',
      );
      });

      res.on('finish', () => {
        const { method, originalUrl } = req;
        const statusCode = res.statusCode;
        const contentLength = res.get('content-length') || 0;
        const duration = Date.now() - req.startTime;
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