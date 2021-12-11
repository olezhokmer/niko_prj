import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PlanModule } from './plan/plan.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true
        }),
        UserModule,
        PlanModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
