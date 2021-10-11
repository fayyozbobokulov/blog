import catchAsync from "../utils/catch.async";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Post } from "../models/index";
import { APIFeatures } from "../utils/api.feature";

export const getPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(Post);
  const features = new APIFeatures(userRepository, req).paginate;
  const result = await features();
  res.status(200).send(result)
})

export const getPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(Post);
  const post = await userRepository.findOne(req.body.id);
  
  if(!post) {
    res.status(404).send({
      status: 'not found',
    })
  }

  res.status(200).send({
    status: 'success',
    data: {
      post
    }
  })
})

export const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(Post);
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.user = req.body.user;
  post.userId = req.body.userId;
  post.createdAt = new Date();
  post.updatedAt = new Date();
  await userRepository.save(req.body)
  // delete post.user;
  res.status(201).send({
    status: 'success',
    data: {
      post
    }
  })
})

export const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(Post);
  const {title, content, id} = req.body;
  const post = await userRepository.findOne(id)

  if(!post) {
    res.status(404).send({
      status: 'not found',
    })
  }

  if(title){
    post.title = title
  }

  if(content){
    post.content = content;
  }

  post.updatedAt = new Date();
  await userRepository.save(post);

  res.status(201).send({
    status: 'success',
    data: {
      post: post
    }
  })
})

export const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(Post);
  const post = userRepository.findOne(req.body.id);

  if(!post) {
    res.status(404).send({
      status: 'not found',
    })
  }

  res.status(200).send({
    status: 'success',
    data: {
      post
    }
  })
})