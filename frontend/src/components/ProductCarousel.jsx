import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Ratio from 'react-bootstrap/Ratio';

const ProductCarousel = () => {

   const { data: products, isLoading, error } = useGetTopProductsQuery();

   return (
      isLoading ? <Loader /> : (
         error ? (
            <Message variant='danger'>
              {error.data?.message || error.error || error.status || "Something went wrong"}
            </Message>
         ) : (
            <Carousel pause='hover' className="bg-primary mb-4">
               {products.map(product => (
                  <Carousel.Item key={product._id}>
                     <Link to={`/product/${product._id}`}>
                     <Ratio aspectRatio="21x9">
                     <Image src={product.image} alt={product.name} fluid />
                     </Ratio>
                        
                        <Carousel.Caption className="carousel-caption">
                           <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                     </Link>
                  </Carousel.Item>
               ))}
            </Carousel>
         )
      )
   )
}

export default ProductCarousel;