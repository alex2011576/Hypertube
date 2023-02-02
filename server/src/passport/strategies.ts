import { Strategy as LocalStrategy } from 'passport-local';
// import FortyTwoStrategy  from 'passport-oauth2';
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

// export const my42Strategy = new FortyTwoStrategy({
//     authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
//     tokenURL: 'https://api.intra.42.fr/oauth/token',
//     clientID: 'u-s4t2ud-7fae5e311a1b4e19da2b63d3244a47e5b53ef4dae4b587eb6165f64cddcf653c',
//     clientSecret: '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',
//     callbackURL: "http://localhost:3001/api/login/42/callback"
//   },
//   function (accessToken: string, refreshToken: string, profile: any, done: any) {
// 	console.log('here');
// 	console.log(accessToken);
// 	console.log(refreshToken);
// 	console.log(profile);
// 	console.log(profile.id);
// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// 	done(null, profile);
//   }
// );