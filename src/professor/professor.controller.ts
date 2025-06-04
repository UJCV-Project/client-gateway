import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PROFESSOR_SERVICE } from 'src/config';
import { CreateProfessorDto, UpdateProfessorDto } from './dto';

@Controller('professor')
export class ProfessorController {
    constructor(
        @Inject(PROFESSOR_SERVICE) private readonly client: ClientProxy,
    ) {}

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
    updateProfessorByCode(@Param('code') code: string, @Body() updateProfessorDto:UpdateProfessorDto) {
        console.log(code);
        return this.client.send(
            { cmd: 'updateProfessorByCode' },
            {code,data: updateProfessorDto},
        );
    }

}
