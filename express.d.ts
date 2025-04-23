import { users } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer;
      user:users;
    }
  }
}