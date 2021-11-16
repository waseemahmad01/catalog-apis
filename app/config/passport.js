import passport from "passport";
import fbStrategy from "passport-facebook";
import goStrategy from "passport-google-oauth20";
import { CLIENT_ID_FB, CLIENT_ID_GO, CLIENT_SECRET_ID_FB, CLIENT_SECRET_ID_GO } from ".";
import { SocialUser } from "..";
const FacebookStrategy = fbStrategy.Strategy;
const GoogleStrategy = goStrategy.Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: CLIENT_ID_FB,
//       clientSecret: CLIENT_SECRET_ID_FB,
//       callbackURL: 'http://localhost:8000/auth/facebook/callback',
//       profileFields: ['id', 'displayName']
//     },
//     function (accessToken, refreshToken, profile, done) {
//       const { email, first_name, last_name } = profile._json;
//       // console.log(profile);
//       //   const userData = {
//       //     email,
//       //     firstName: first_name,
//       //     lastName: last_name
//       //   };
//       //   new userModel(userData).save();
//       done(null, profile);
//     }
//   )
// );

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID_GO,
  clientSecret: CLIENT_SECRET_ID_GO,
  callbackURL: "http://localhost:8000/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    const { email, name } = profile._json;
    try {
      const user = await SocialUser.findOne({ email: email });
      if (!user) {
        const userData = {
          name,
          email,
        };
        await new SocialUser(userData).save();
      }
    } catch (error) {
      return next(error);
    }
    done(null, profile);
  }
));