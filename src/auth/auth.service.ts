import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const userByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });

    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }
    return null;
  }

  async signIn(username: string, pass: string) {
    const user = await this.validateUser(username, pass);

    if (!user) throw new UnauthorizedException('Invalid Username or Password');

    // Limpiamo la contrase#a del user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: result,
    };
  }
}
