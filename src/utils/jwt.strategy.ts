import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";

export const hashedPassword = async (password: string, salt: string): Promise<string> => {
  return bcrypt.hash(password, salt);
}

export const signToken = (id: number, username: string) => {
  return jwt.sign({id, username}, "jwtSecret", { expiresIn: "10m" });
};