import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Meeting } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(offset: number, limit: number): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
      include: {
        meetings: true,
      },
    });

    return users.map((user) => ({
      ...user,
      meetingDays: user.meetings.map((meeting) => ({
        startDay: meeting.startDay,
        endDay: meeting.endDay,
      })),
      daysWithoutMeetings: this.calculateDaysWithoutMeetings(
        user.days,
        user.meetings,
      ),
    }));
  }

  private calculateDaysWithoutMeetings(
    totalDays: number,
    meetings: Meeting[],
  ): number {
    const daysWithMeetings = new Set<number>();

    meetings.forEach((meeting) => {
      for (let day = meeting.startDay; day <= meeting.endDay; day++) {
        daysWithMeetings.add(day);
      }
    });

    return totalDays - daysWithMeetings.size;
  }
}
