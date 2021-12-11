import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from 'src/dto/user/login.dto';
import { RegisterDto } from 'src/dto/user/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}

    @Post('/login')
    async login(@Body() dto : LoginDto){
        this.authService.validateLoginDto(dto);
        const user = await this.authService.login(dto.email, dto.password);
        return this.authService.createToken(user.id);
    }

    @Post('/register')
    async register(@Body() dto : RegisterDto){
        this.authService.validateRegisterDto(dto);
        const user = await this.authService.create(dto.email, dto.password);
        return this.authService.createToken(user.id);
    }
}

