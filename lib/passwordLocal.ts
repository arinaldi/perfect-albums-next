import Local from 'passport-local';
import { findUser, validatePassword } from 'lib/user';

export const localStrategy = new Local.Strategy(function (
  username: string,
  password: string,
  done: (error?: Error | null, user?: any) => void,
) {
  findUser({ username })
    .then((user: any) => {
      if (user && validatePassword(user, password)) {
        done(null, user);
      } else {
        done(new Error('Invalid username or password'));
      }
    })
    .catch((error: Error) => {
      done(error);
    });
});
