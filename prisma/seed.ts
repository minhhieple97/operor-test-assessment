import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Read users.json
  const usersPath = path.join(__dirname, 'dummy-data/users.json');
  const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

  // Read meetings.json
  const meetingsPath = path.join(__dirname, 'dummy-data/meetings.json');
  const meetingsData = JSON.parse(fs.readFileSync(meetingsPath, 'utf-8'));

  // Insert users data
  for (const user of usersData) {
    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        gender: user.gender,
        days: user.days,
        ipAddress: user.ip_address,
      },
    });
  }

  // Insert meetings data
  for (const meeting of meetingsData) {
    await prisma.meeting.create({
      data: {
        id: meeting.id,
        startDay: meeting.start_day,
        endDay: meeting.end_day,
        userId: meeting.user_id,
        roomId: meeting.room_id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
