import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupInput } from './dto/signup.input';
import { User } from 'src/users/entities/user.entity';
import { LoginInput } from './dto/login.input';
import { CustomLoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: CustomLoggerService,
  ) {}

  async signup(signupInput: SignupInput) {
    this.logger.log(`Signing up user with email: ${signupInput.email}`);

    try {
      const user = await this.userService.create({
        email: signupInput.email,
        username: signupInput.username,
        password: signupInput.password,
      });

      const accessToken = this.generateToken(user);

      return {
        accessToken,
        user,
      };
    } catch (error) {
      this.logger.error(
        `Error during signup for email: ${signupInput.email}`,
        error.stack,
      );
      throw error;
    }
  }

  async login(loginInput: LoginInput) {
    const user = await this.userService.findByEmail(loginInput.email);

    if (!user) {
      this.logger.warn(
        `Login failed: User not found for email ${loginInput.email}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.userService.validatePassword(
      loginInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.warn(
        `Login failed: Invalid password for email ${loginInput.email}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(user);

    return { accessToken, user };
  }

  async validateUser(userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
