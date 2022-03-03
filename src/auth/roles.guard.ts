import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/users/entities/role.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        //Get the `roles` meta data from context's class and handler/method
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(), context.getClass()
        ]);

        console.log(requiredRoles);

        if (!requiredRoles) return true;

        const user: User = context.switchToHttp().getRequest().user;

        return requiredRoles.some(role => user.roles.includes(role));
        
    }
}