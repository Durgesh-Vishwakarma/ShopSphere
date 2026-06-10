import mongoose from "mongoose";
import { buildImageVariants } from '../utils/imageUtils.js';


const reviewSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
   name: { type: String, required: true },
   rating: { type: Number, required: true },
   comment: { type: String, required: true }
}, { timestamps: true });


const productSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
   name: { type: String, required: true },
   image: { type: String, required: true },
   imageVariants: {
      original: { type: String },
      thumb: { type: String },
      card: { type: String },
      carousel: { type: String },
      full: { type: String },
   },
   description: { type: String, required: true },
   brand: { type: String, required: true },
   category: { type: String, required: true },
   reviews: [reviewSchema],
   price: { type: Number, required: true, default: 0 },
   countInStock: { type: Number, required: true, default: 0 },
   rating: { type: Number, required: true, default: 0 },
   numReviews: { type: Number, required: true, default: 0 }
}, { timestamps: true });

productSchema.pre('save', function (next) {
   if (this.isModified('image') || !this.imageVariants?.original) {
      this.imageVariants = buildImageVariants(this.image);
   }

   next();
});

productSchema.index({ name: 'text', brand: 'text', category: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model('Product', productSchema);
export default Product;