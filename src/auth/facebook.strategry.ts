import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { AuthService } from "./auth.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
    constructor() {
        /**
         * More details @see https://passportjs.org/packages/passport-facebook
         */
        console.log("process.env.APP_ID:"+ process.env.APP_ID)
        super({
            clientID: process.env.APP_ID,
            clientSecret: process.env.APP_SECRET,
            callbackURL: "http://localhost:3000/v1/auth/facebook/callback",
            scope: "email",
            profileFields: ['id', 'displayName', 'name', 'photos', 'emails']
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void
      ): Promise<any> {
        console.log("fb validate:", profile, accessToken, refreshToken);
        const { name, emails } = profile;
        const user = {
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
        };
        const payload = {
          user,
          accessToken,
        };
    
        done(null, payload);
      }
}