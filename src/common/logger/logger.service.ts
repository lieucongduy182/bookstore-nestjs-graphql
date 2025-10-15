import {
  Injectable,
  Logger,
  LoggerService as NestLoggerService,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService implements NestLoggerService {
  private logger: Logger;
  private context: string;

  constructor() {
    this.logger = new Logger();
  }

  setContext(context: string) {
    this.context = context;
    this.logger = new Logger(context);
  }

  log(message: string, context?: string) {
    this.logger.log(message, context || this.context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context || this.context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context || this.context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context || this.context);
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, context || this.context);
  }

  logRequest(method: string, url: string, userId?: string) {
    const user = userId ? `User: ${userId}` : 'Anonymous';
    this.log(`${method} ${url} - ${user}`);
  }

  logResponse(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
  ) {
    this.log(`${method} ${url} - ${statusCode} - ${duration}ms`);
  }

  logError(error: Error, context?: string) {
    this.error(`Error: ${error.message}`, error.stack, context || this.context);
  }
}
