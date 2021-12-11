import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanDto } from 'src/dto/plan/plan.dto';
import { Plan } from 'src/entities/plan.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {

    constructor(
        @InjectRepository(Plan) private planRepo: Repository<Plan>
    ) {}
    
    validatePlanDto(dto : PlanDto) : void {
        if(!dto.value) throw new HttpException("Empty plan.", 400);
    }

    async createPlan(value : string, user : User) : Promise<Plan> {
        const plan = await this.planRepo.save({ value, user });
        delete plan.user;
        return plan;
    }

    async getPlans(user: User) : Promise<Plan[]> {
        const plans = await this.planRepo.find({ relations : ['user'], where: { user }, order : { created_at: "DESC" } });
        return plans.map(p => {
            delete p.user;
            return p;
        })
    }

    async updatePlan(id: number, value : string) : Promise<any> {
        return await this.planRepo.update({ id }, { value });
    }

    async deletePlan(id : number) : Promise<any> {
        return await this.planRepo.delete({ id });
    }

    async doPlan(id : number) : Promise<any> {
        return await this.planRepo.update({ id }, { done : true });
    }
}
