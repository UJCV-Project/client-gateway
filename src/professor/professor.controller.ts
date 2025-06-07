import { Body, Controller, Get, Inject, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PROFESSOR_SERVICE } from 'src/config';
import { CreateProfessorDto, UpdateProfessorDto } from './dto';
import { AvailabilityDto } from './dto/availability.dto';

@Controller('professor')
export class ProfessorController {
    constructor(
        @Inject(PROFESSOR_SERVICE) private readonly client: ClientProxy,
    ) { }
    logger = new Logger('Professor Service');

    //Professor

    @Post()
    async createProfessor(@Body() createProfessor: CreateProfessorDto) {
        const response = await this.client.send({ cmd: 'createProfessor' }, createProfessor);
        return response;
    }

    @Get()
    findAllProfessor(@Query() paginationDto: PaginationDto) {
        return this.client.send(
            { cmd: 'findAllProfessor' },
            paginationDto,
        );
    }

    @Get(':code')
    findProfessorByCode(@Param('code') code: string) {
        console.log(code);
        return this.client.send(
            { cmd: 'findProfessorByCode' },
            code,
        );
    }

    @Patch(':code')
    updateProfessorByCode(@Param('code') code: string, @Body() updateProfessorDto: UpdateProfessorDto) {
        console.log(code);
        return this.client.send(
            { cmd: 'updateProfessorByCode' },
            { code, data: updateProfessorDto },
        );
    }

    //AvailableSchedule
    @Post('/:id/available/')
    async saveAvailabilitySchedule(@Param('id') professorId: string, @Body() slots: AvailabilityDto) {
        const payload =  { professorId, ...slots }
        this.logger.debug(payload);
        const response = await this.client.send({ cmd: 'saveAvailabilitySchedule' }, payload);
        return response;
    }

    @Get('/:id/available/')
    async findAvailabilitySchedule(@Param('id') professorId: string) {
        this.logger.debug(`Professor ID ${professorId}`);
        const response = await this.client.send({ cmd: 'findAvailabilityById' }, professorId);
        return response;
    }
}
