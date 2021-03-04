import crypto from 'crypto';

import dbConnect from 'lib/dbConnect';
import User from 'models/User';
import { User as UserType } from 'utils/types';

interface Credentials {
  username: string;
  password: string;
}

interface UserPayload {
  username: string;
  success: boolean;
}

export async function createUser({ username, password }: Credentials): Promise<UserPayload> {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  const user = { username, hash, salt };
  let success;

  try {
    await dbConnect();
    await User.create(user);
    success = true;
  } catch (error) {
    success = false;
  }

  return { success, username };
}

export async function findUser({ username }: { username: string }): Promise<UserType> {
  await dbConnect();

  return await User.findOne({ username });
}

export function validatePassword(user: UserType, inputPassword: string): boolean {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');

  return user.hash === inputHash;
}
