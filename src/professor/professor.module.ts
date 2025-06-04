import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROFESSOR_SERVICE } from 'src/config';
import { envs } from './professor.envs';

@Module({
  controllers: [ProfessorController],
  imports: [
    ClientsModule.register([
      {
        name: PROFESSOR_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.PROFESSOR_MICROSERVICE_HOST,
          port: envs.PROFESSOR_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
})
export class ProfessorModule {}

