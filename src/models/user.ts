import bcrypt from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
  BaseEntity,
} from "typeorm";
import { Post } from "./post";

@Entity()
@Unique(["email", "username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column({ nullable: true, default: null })
  lastName!: string;

  @Column({ nullable: true, default: null })
  email!: string;

  @Column({ nullable: true, default: null })
  username!: string;

  @Column({ nullable: true, default: null })
  password!: string;

  @Column({ nullable: true, default: null })
  salt!: string;

  @OneToMany((_type) => Post, (post: Post) => post.user)
  posts!: Array<Post>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  async isValidPassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}