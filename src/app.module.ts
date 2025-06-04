import { Module } from '@nestjs/common';
import { ProfessorModule } from './professor/professor.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsInterceptor } from './common';

@Module({
  providers:[
    {
      provide: APP_INTERCEPTOR,
      useClass: AllExceptionsInterceptor,
    },
  ],
  imports: [ProfessorModule, HealthCheckModule],
})
export class AppModule {}
