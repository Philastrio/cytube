import express from 'express';
import { onlyPrivate, uploadAvatar } from '../middlewares';
import routes from '../routes';
import {
	getChangePassword,
	postChangePassword,
	getEditProfile,
	postEditProfile,
	userDetail,
	users,
} from '../controllers/userController';


const userRouter = express.Router();

userRouter.get(routes.users, onlyPrivate, users);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.usersDetail(), userDetail);

export default userRouter;