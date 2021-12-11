import { Controller, Get, UseGuards, Request, Body, Put, Patch, Delete, Param, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { PlanDto } from 'src/dto/plan/plan.dto';
import { Plan } from 'src/entities/plan.entity';
import { PlanService } from './plan.service';


@Controller('plan')
@UseGuards(JwtAuthGuard)
export class PlanController {
    constructor(private planService: PlanService) {}

    @Get('/')
    async get(@Request() req) {
        return await this.planService.getPlans(req.user);
    }

    @Put('/')
    async create(@Body() plan : PlanDto, @Request() req) : Promise<Plan> {
        this.planService.validatePlanDto(plan);
        return await this.planService.createPlan(plan.value, req.user);
    }

    @Patch('/:id')
    async update(@Body() plan : PlanDto, @Request() req, @Param() params) {
        const id = Number(params.id);
        if(isNaN(id) || id < 0) throw new HttpException("Invalid id.", 400);
        this.planService.validatePlanDto(plan);
        return this.planService.updatePlan(id, plan.value);
    }

    @Delete('/:id')
    async delete(@Request() req, @Param() params) {
        const id = Number(params.id);
        if(isNaN(id) || id < 0) throw new HttpException("Invalid id.", 400);
        return await this.planService.deletePlan(id);
    }

    @Get('/do/:id')
    async doPlan(@Request() req, @Param() params) {
        const id = Number(params.id);
        if(isNaN(id) || id < 0) throw new HttpException("Invalid id.", 400);
        return await this.planService.doPlan(id);
    }
}
