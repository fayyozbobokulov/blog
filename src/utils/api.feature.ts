import { Post } from "../models/post";
import { Repository } from "typeorm";

export class APIFeatures {
  constructor(public query: Repository<Post>, public queryString:any) {
    this.query = query;
    this.queryString = queryString
  }

  public async paginate() {
    const queryBuilder = this.query.createQueryBuilder('post');
    const page = this.queryString.page * 1 || 1;
    const perPage = 20;
    const total = await queryBuilder.getCount();
    queryBuilder.offset((page - 1) * perPage).limit(perPage);
    const posts = await queryBuilder.getMany();
    return {
      data: posts,
      page,
      last_page: Math.ceil(total / perPage)
    }
  }
}