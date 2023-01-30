import { Strategy as LocalStrategy } from 'passport-local';
import { parseUsername, validatePassword } from '../validators/userPayloadValidators';
import { findUserByUsername } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export const myLocalStrategy = new LocalStrategy(
	(username: string, password: string, done) => {
		const asyncStrategy = async () => {
				try {
					const parsedUsername = parseUsername(username);
					const parsedPassword = validatePassword(password);
					
					const user = await findUserByUsername(parsedUsername);
					if (!user) {
						return done(null, false, { message: 'User not found' });
					}
					
					const passwordCorrect = await bcrypt.compare(parsedPassword, user.passwordHash);
					if (!passwordCorrect) {
						return done(null, false, {message: 'Wrong password' });
					}
					if (!user.isActive) {
						return done(null, false, {message: 'Account is not active' });
					}
					return done(null, user);
				} catch (e) {
					return done(e);
				}
		};
		void asyncStrategy();
	}

);