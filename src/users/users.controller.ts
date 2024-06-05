import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ): Promise<User[]> {
    if (offset < 0 || limit <= 0) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    return this.userService.getUsers(offset, limit);
  }
}
