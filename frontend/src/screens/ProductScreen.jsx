import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Image } from "../components/ui/Image";
import { Badge } from "../components/ui/Badge";
import { Select } from "../components/ui/Select";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import './ProductScreen.css';

const ProductScreen = () => {

   const { id: productId } = useParams();

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [qty, setQty] = useState(1);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState(''); 
   
   const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId);

   const [createReview, { isLoading: productReviewLoading }] = useCreateReviewMutation();

   const { userInfo } = useSelector(state => state.auth);


   const addToCartHandler = () => {
      dispatch(addToCart({ ...product, qty }));
      navigate('/cart'); 
   };

   const formSubmitHandler = async event => {
      event.preventDefault();

      try {
         await createReview({ productId, rating, comment }).unwrap();
         refetch();
         toast.success('Review Submitted');
         setRating(0);
         setComment('');
      } catch (err) {
         toast.error(err?.data?.message || err.error);
      }
   };

   return (
      <>
         <Link className="btn btn-light my-3" to="/">Go Back</Link>
         {isLoading ? (
            <Loader />
         ) : (
            error ? (
               <Message variant='danger'>
                  { error?.data?.message || error.error }
               </Message>
            ) : (
               <>
                  <Meta title={product.name} description={product.description} />
                  <div className="grid lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-1">
                        <Image src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
                     </div>
                     <div className="lg:col-span-1">
                        <Card className="p-6 h-fit">
                           <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                           <div className="space-y-4">
                              <div>
                                 <Rating value={product.rating} text={`${product.numReviews} ${product.numReviews === 1 ? 'review' : 'reviews'}`} />
                              </div>
                              <div>
                                 <span className="text-3xl font-bold text-orange-500">${product.price}</span>
                              </div>
                              <div>
                                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                 <p className="text-gray-600 leading-relaxed">{product.description}</p>
                              </div>
                           </div>
                        </Card>
                     </div>
                     <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-8">
                           <div className="space-y-6">
                              <div className="flex justify-between items-center">
                                 <span className="text-lg font-medium text-gray-900">Price:</span>
                                 <span className="text-2xl font-bold text-orange-500">${product.price}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="text-lg font-medium text-gray-900">Status:</span>
                                 <Badge variant={product.countInStock > 0 ? 'success' : 'danger'}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                 </Badge>
                              </div>

                              {product.countInStock > 0 && (
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Quantity
                                    </label>
                                    <Select 
                                       value={qty}
                                       onChange={(e) => setQty(Number(e.target.value))}
                                       className="w-full"
                                    >
                                       {[...Array(product.countInStock).keys()].map((x) => (
                                          <option key={x + 1} value={x + 1}>
                                             {x + 1}
                                          </option>
                                       ))}
                                    </Select>
                                 </div>
                              )}

                              <Button
                                 onClick={addToCartHandler}
                                 disabled={product.countInStock === 0}
                                 className="w-full bg-gray-900 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                 size="lg"
                              >
                                 <Plus className="w-4 h-4 mr-2" />
                                 Add To Cart
                              </Button>
                           </div>
                        </Card>
                     </div>
                  </div>
                  <div className="mt-12">
                     <div className="max-w-3xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <div className="space-y-6">
                           {product.reviews.map(review => (
                              <Card key={review._id} className="p-6">
                                 <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                       <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                       <span className="text-sm text-gray-500">{review.createdAt.substring(0, 10)}</span>
                                    </div>
                                    <Rating value={review.rating} />
                                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                                 </div>
                              </Card>
                           ))}
                           
                           <Card className="p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-6">Write a Customer Review</h3>
                              
                              {productReviewLoading && <Loader />}
                              {userInfo ? (
                                 <form onSubmit={formSubmitHandler} className="space-y-6">
                                    <div>
                                       <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Rating
                                       </label>
                                       <Select
                                          value={rating}
                                          onChange={(e) => setRating(Number(e.target.value))}
                                          className="w-full"
                                       >
                                          <option value=''>Select</option>
                                          <option value='1'>1 - Poor</option>
                                          <option value='2'>2 - Fair</option>
                                          <option value='3'>3 - Good</option>
                                          <option value='4'>4 - Very Good</option>
                                          <option value='5'>5 - Excellent</option>
                                       </Select>
                                    </div>

                                    <div>
                                       <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Comment
                                       </label>
                                       <textarea
                                          rows={3}
                                          placeholder="Write a comment"
                                          value={comment}
                                          onChange={(e) => setComment(e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                       />
                                    </div>

                                    <Button 
                                       disabled={productReviewLoading}
                                       type="submit"
                                       className="bg-gray-900 hover:bg-orange-500 text-white"
                                    >
                                       Submit Review
                                    </Button>
                                 </form>
                              ) : (
                                 <Message>
                                    Please <Link to='/auth'>sign in</Link> to write a review
                                 </Message>
                              )}
                           </Card>
                        </div>
                     </div>
                  </div>  
               </>
            )
         )}
      </>
   );
};

export default ProductScreen;