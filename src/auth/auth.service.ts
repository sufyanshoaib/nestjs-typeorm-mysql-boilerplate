import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        console.log("")
        if (user && password === user.password) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = {
            name: user.name, 
            sub: user.id,
            roles: user.roles
        };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
