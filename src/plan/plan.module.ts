import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from 'src/entities/plan.entity';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([Plan])
    ],
    providers: [PlanService],
    controllers: [PlanController]
})
export class PlanModule {}
