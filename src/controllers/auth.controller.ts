import { User } from "../models/index";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

import catchAsync from "../utils/catch.async";
import { NextFunction, Response, Request } from "express";
import { hashedPassword, signToken } from "../utils/jwt.strategy";
import { AppError } from "../utils/app.error";

export interface ITokenInfo {
  id: number;
  username: string;
}

export const signup = catchAsync( async (req:Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User);

  const user = new User();
  console.log(req.body);
  
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.salt = await bcrypt.genSalt(10);
  user.password = await hashedPassword(req.body.password, user.salt);
  await userRepository.save(user);
  delete user.password;
  console.log(user);

  const token = signToken(user.id, user.username)
  res.status(200).send({
    status: 'success',
    data: {
      token,
    }
  });
})

export const signin = catchAsync(async (req:Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User);
  const { email, password } = req.body;
  if(!email || !password) {
    return next(new AppError('Pls provide email and password!', 400))
  }

  const user = await userRepository.findOne({ email });
  if(!user || !(await user.isValidPassword(password))){
    return next(new AppError('Incorrect email or password', 401));
  };
  
  const token = signToken(user.id, user.username);
  res.status(200).send({
    status: 'success',
    data: {
      token,
    }
  })
})

export const protect = catchAsync(async (req:Request, res: Response, next: NextFunction) => {
  let token: string;
  const userRepository = getRepository(User);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('working');
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  const decoded: any = jwt.verify(token, "jwtSecret");
  const user = userRepository.findOne(decoded.id);
  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  req.body.user = user;
  next();
});

export const getUsers = catchAsync(async (req:Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  res.send(users);
});