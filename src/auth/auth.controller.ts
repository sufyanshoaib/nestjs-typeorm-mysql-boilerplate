import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookAuthGuard } from './facebook-auth.guard';
import { JwtAuthGaurd } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller({ path:'auth', version: '1'})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGaurd)
  @Post('user')
  getTokenInfo(@Request() req): any {
    return req.user
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook/login')
  facebookLogin(@Request() req) :any {
    return req.user
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook/callback')
  facebookLoginCallback(@Request() req) :any {
    return req.user
  }

}
