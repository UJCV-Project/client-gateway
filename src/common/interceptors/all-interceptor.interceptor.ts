import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AllExceptionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const response = context.switchToHttp().getResponse();
        response.status(err.response.statusCode || 500).json({
          ...err.response,
          error: err.response.error || 'Error Interno no Controlado',
          statusCode: err.response.statusCode || 500,
          message: err.response.message || 'Ocurrió un error interno',
        });
        throw err;
      }),
    );
  }
}
