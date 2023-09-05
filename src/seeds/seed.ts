import { PrismaClient } from "@prisma/client";

//interfaces
import { ICategory } from '../../../himoon-frontend/src/interfaces/category';

//mocks
import adjectives from '../mocks/adjectives';
import categories from "../mocks/categories";

//models
import ProductModel from "../models/productModel";
import CategoryModel from "../models/categoryModel";

const prisma = new PrismaClient();

const productModel = new ProductModel();
const categoryModel = new CategoryModel();

async function seed() {

  async function cleanDB() {
    console.log("Database cleaned.");
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()

  }

  try {
    await cleanDB();

    console.log("Seeding database...");
    await prisma.user.create({
      data: {
        username: "Guilherme Galeno",
        email: "galenomoon@gmail.com",
        password: "123123123",
      }
    })

    let newCategories: Promise<ICategory>[] = [];
    categories.forEach(name => {
      const newCategory = categoryModel.create({ name })
      newCategories.push(newCategory)
    });


    newCategories.forEach(async (category) => {
      const currentCategory = (await category)
      adjectives.forEach(async (adjective) => {
        await productModel.create({
          name: `${currentCategory.name} ${adjective}`,
          description: `Um produto MUITO ${adjective}, realmente o ${currentCategory.name} é o melhor produto de todos os tempos`,
          price: Math.floor(Math.random() * 1000),
          images: [''],
          categoryId: Number(currentCategory.id),
        });
      });
    });

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
