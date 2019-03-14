import passport from 'passport';
import GithubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import KakaoStrategy from 'passport-kakao';

import {
  facebookLoginCallback,
  githubLoginCallback
} from './controllers/userController';
import User from './models/User';
import routes from './routes';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://suspicious-cori-41b99d.netlify.com${
        routes.githubCallback
      }`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://breezy-cobra-21.localtunnel.me/${
        routes.facebookCallback
      }`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      scope: ['public_profile', 'email']
    },
    facebookLoginCallback
  )
);

/* passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KK_ID,
      clientSecret: process.env.KK_SECRET,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    },
    KakaoLoginCallback
  )
); */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
