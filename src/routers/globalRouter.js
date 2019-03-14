import express from 'express';
import passport from 'passport';
import { onlyPrivate, onlyPublic } from '../middlewares';
import {
  postJoin,
  getJoin,
  getlogin,
  postlogin,
  logout,
  githubLogin,
  postGithubLogin,
  getMe, facebookLogin, postFacebookLogin
} from '../controllers/userController';
import { home, search } from '../controllers/videoController';
import routes from '../routes';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postlogin);

globalRouter.get(routes.login, onlyPublic, getlogin);
globalRouter.post(routes.login, onlyPublic, postlogin);


globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: '/login' }),
  postGithubLogin,
);

globalRouter.get(routes.me, onlyPrivate, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  postFacebookLogin,
);

export default globalRouter;