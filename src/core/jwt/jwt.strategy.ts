import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * The validate() method deserves some discussion. For the jwt-strategy,
   * Passport first verifies the JWT's signature and decodes the JSON.
   * It then invokes our validate() method passing the decoded JSON as its single parameter.
   * Based on the way JWT signing works, we're guaranteed that we're receiving a valid token that
   * we have previously signed and issued to a valid user.
   */
  async validate(payload: any) {
    return {
      id: payload.userId,
      username: payload.username,
      name: payload.name,
    };
  }
}
