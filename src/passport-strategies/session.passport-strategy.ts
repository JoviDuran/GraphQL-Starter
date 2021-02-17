import passport from 'passport';
import { userService } from '@app/core/services';
import { IUserEntity } from 'src/modules/user';

// TODO:
passport.serializeUser((user: IUserEntity, done) => {
  done(null, user.id);
});

// "userId" is the serialized value from the "serializeUser" function above
passport.deserializeUser(async (userId: string, done) => {
  try {
    const authenticatedUser = await userService.getById(userId);
    done(null, authenticatedUser);
  } catch (err) {
    done(err, undefined);
  }
});

// We extend the global Express User interface with our User model
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends IUserEntity {}
  }
}