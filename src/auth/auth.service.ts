import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/user/login.dto';
import { RegisterDto } from 'src/dto/user/register.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService
    ) {}

    validateJwtPayload(payload : { id : number }) : boolean {
        if(typeof payload.id != 'number' || payload.id <= 0) return false; else return true;
    }

    validateLoginDto(dto : LoginDto) : void {
        try {
            this.validateEmail(dto.email)
            this.validatePass(dto.password)
        } catch(e) {
            throw e;
        }
    }

    validateRegisterDto(dto : RegisterDto) : void {
        try {
            this.validateEmail(dto.email)
            this.validatePass(dto.password)
        } catch(e) {
            throw e;
        }
        if(dto.password != dto.passwordConfirm) throw new HttpException("Password is not confirmed.", 400);
    }

    validateEmail(email : string) : void {
        if(!email) throw new HttpException("Empty email.", 400);
        if(typeof email != 'string' || email.length > 320 || !String(email).toLowerCase().match(emailRegExp))
        throw new HttpException("Invalid email.", 400);       
    }

    validatePass(p : string) : void {
        if(!p) throw new HttpException("Empty password.", 400);
        if(typeof p != 'string' || p.length < 8 || p.length > 256) 
        throw new HttpException("Password length must be more than 8 and less than 256 symbols.", 400);
    }

    async create(email : string, password : string) : Promise<User> {
        const hash = await bcrypt.hash(password, await bcrypt.genSalt());
        return await this.userRepo.save({ email, password : hash })
    }

    async login(email : string, password : string) : Promise<User> {
        const user = await this.userRepo.findOne({ where : { email }});
        if(!user) throw new HttpException("Email doesn't exist.", 400);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new HttpException("Incorrect password.", 400);
        return user;
    }

    createToken(id : number) {
        return this.jwtService.sign({ id })
    }
}
