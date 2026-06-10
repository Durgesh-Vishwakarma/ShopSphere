import dotenv from "dotenv";
import "colors";
import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import { buildImageVariants } from './utils/imageUtils.js';

import connectDB from "./config/db.js";

dotenv.config();

if (process.env.NODE_ENV === 'production') {
   console.error('Seeder is for local development only. Refusing to run in production.');
   process.exit(1);
}

connectDB();

const importData = async () => {

   try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();

      const createdUsers = await User.insertMany(users);

      const adminUser = createdUsers[0]._id;

      const sampleProducts = products.map(product => {
         return {
            ...product,
            user: adminUser,
            imageVariants: buildImageVariants(product.image),
         };
      });

      await Product.insertMany(sampleProducts);
      
      console.log('Data Imported'.green.inverse);
      process.exit();
   } catch (error) {
      console.log(`${error}.red.inverse`);
      process.exit(1);
   }
};


const destroyData = async () => {

   try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();

      console.log('Data destroyed!'.red.inverse);
      process.exit();
   } catch (error) {
      console.log(`${error}`.red.inverse);
      process.exit(1);
   }
};


if (process.argv[2] === '-d') {
   destroyData();
}

else {
   importData();
}
