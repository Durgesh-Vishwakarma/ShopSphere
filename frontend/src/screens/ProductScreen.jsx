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
import { ArrowLeft, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

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
         <Link className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80" to="/">
            <ArrowLeft className="w-4 h-4" />
            Back to products
         </Link>
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
                  <div className="grid gap-6 lg:grid-cols-3">
                     <div className="lg:col-span-1">
                        <Image src={product.image} alt={product.name} className="h-96 w-full rounded-lg border border-gray-200 object-cover" />
                     </div>
                     <div className="lg:col-span-1">
                        <Card className="h-fit p-6">
                           <h1 className="mb-4 text-2xl font-semibold text-gray-950">{product.name}</h1>
                           <div className="space-y-4">
                              <div>
                                 <Rating value={product.rating} text={`${product.numReviews} ${product.numReviews === 1 ? 'review' : 'reviews'}`} />
                              </div>
                              <div>
                                 <span className="text-2xl font-semibold text-gray-950">${product.price}</span>
                              </div>
                              <div>
                                 <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Description</h3>
                                 <p className="text-gray-600 leading-relaxed">{product.description}</p>
                              </div>
                           </div>
                        </Card>
                     </div>
                     <div className="lg:col-span-1">
                        <Card className="sticky top-20 p-6">
                           <div className="space-y-6">
                              <div className="flex justify-between items-center">
                                 <span className="font-medium text-gray-700">Price</span>
                                 <span className="text-xl font-semibold text-gray-950">${product.price}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="font-medium text-gray-700">Status</span>
                                 <Badge variant={product.countInStock > 0 ? 'success' : 'danger'}>
                                    {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
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
                                 className="w-full"
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
                        <h2 className="text-2xl font-semibold text-gray-950 mb-6">Reviews</h2>
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
                              <h3 className="text-xl font-semibold text-gray-950 mb-6">Write a Review</h3>
                              
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
                                          className="input min-h-24"
                                       />
                                    </div>

                                    <Button 
                                       disabled={productReviewLoading}
                                       type="submit"
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
