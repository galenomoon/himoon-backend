import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces/user";

const prisma = new PrismaClient();

export default class UserModel {

  async getByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async create({ username, email, password }: User) {
    const user = await prisma.user.create({
      data: { username, email, password },
    });
    return user;
  }

  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return {
      id: user?.id,
      username: user?.username,
      email: user?.email,
    }
  }
  
}