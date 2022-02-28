import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { platform } from "os";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        /**
         * More details @see https://passportjs.org/packages/passport-jwt
         * This actually validates the token, if verfied sends the decoded token to validate()
         */
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET'
        })
    }

    async validate(payload: any) {
        return {
            id: payload.sub,
            name: payload.name
        }
    }
}