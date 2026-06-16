import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import toast from "react-hot-toast";
import { 
   useUpdateProductMutation, 
   useGetProductDetailsQuery, 
   useUploadProductImageMutation 
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {

   const { id: productId } = useParams();

   const [name, setName] = useState('');
   const [price, setPrice] = useState('0');
   const [image, setImage] = useState('');
   const [brand, setBrand] = useState('');
   const [category, setCategory] = useState('');
   const [countInStock, setCountInStock] = useState('0');
   const [description, setDescription] = useState('');

   const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

   const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();

   const [uploadProductImage, { isLoading: uploadLoading }] = useUploadProductImageMutation();

   const navigate = useNavigate();


   useEffect(() => {
      if (product) {
         setName(product.name);
         setPrice(String(product.price));
         setImage(product.image);
         setBrand(product.brand);
         setCategory(product.category);
         setCountInStock(String(product.countInStock));
         setDescription(product.description);
      }
   }, [product]);

   const formSubmitHandler = async event => {
      event.preventDefault();

      const updatedProduct = {
         productId,
         name,
         price: Number(price),
         image,
         brand,
         category,
         countInStock: Number(countInStock),
         description
      };

      try {
         await updateProduct(updatedProduct).unwrap();
         toast.success('Product updated successfully');
         refetch();
         navigate('/admin/productlist');
      } catch (err) {
         const validationMessage = err?.data?.errors?.[0]?.msg;
         toast.error(validationMessage || err?.data?.message || err?.error || 'Failed to update product');
      }
   };

   const uploadFileHandler = async event => {

      const formData = new FormData();
      formData.append('image', event.target.files[0]);

      try {
         const responseData = await uploadProductImage(formData).unwrap();
         toast.success(responseData.message);
         setImage(responseData.image); 
      } catch (err) {
         toast.error(err?.data?.message || err.error);
      }
   };


   return (
      <div className="space-y-4">
         <Link to='/admin/productlist' className="btn-outline h-10 w-fit px-4 py-2">
            Back to products
         </Link>

         <FormContainer>
            <Card className="p-6 shadow-lg space-y-4">
               <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
               {updateLoading && <Loader />}

               {isLoading ? <Loader /> : (
                  error ? (
                     <Message variant='danger'>{error?.data?.message || error?.error}</Message>
                  ) : (
                     <form onSubmit={formSubmitHandler} className="space-y-4">
                        <div>
                           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                           <Input
                              id="name"
                              type="text"
                              placeholder="Enter product name"
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                              required
                           />
                        </div>

                        <div>
                           <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                           <Input
                              id="price"
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="Enter price"
                              value={price}
                              onChange={(event) => setPrice(event.target.value)}
                              required
                           />
                        </div>

                        <div>
                           <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                           <Input
                              id="image"
                              type="text"
                              placeholder="Enter image URL"
                              value={image}
                              onChange={(event) => setImage(event.target.value)}
                              required
                           />
                        </div>

                        <div>
                           <label htmlFor="image-file" className="block text-sm font-medium text-gray-700 mb-1">Upload image</label>
                           <Input
                              id="image-file"
                              type="file"
                              accept="image/*"
                              onChange={uploadFileHandler}
                           />
                           {uploadLoading && <Loader />}
                        </div>

                        <div>
                           <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                           <Input
                              id="brand"
                              type="text"
                              placeholder="Enter brand"
                              value={brand}
                              onChange={(event) => setBrand(event.target.value)}
                              required
                           />
                        </div>

                        <div>
                           <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                           <Input
                              id="category"
                              type="text"
                              placeholder="Enter category"
                              value={category}
                              onChange={(event) => setCategory(event.target.value)}
                              required
                           />
                        </div>

                        <div>
                           <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700 mb-1">Count In Stock</label>
                           <Input
                              id="countInStock"
                              type="number"
                              min="0"
                              step="1"
                              placeholder="Enter stock count"
                              value={countInStock}
                              onChange={(event) => setCountInStock(event.target.value)}
                              required
                           />
                        </div>

                        <div>
                           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                           <textarea
                              id="description"
                              className="input min-h-32"
                              placeholder="Enter description"
                              rows={4}
                              value={description}
                              onChange={(event) => setDescription(event.target.value)}
                              required
                           />
                        </div>

                        <Button type='submit' className='w-full' loading={updateLoading}>
                           Update Product
                        </Button>
                     </form>
                  )
               )}
            </Card>
         </FormContainer>
      </div>
   )
}

export default ProductEditScreen;
