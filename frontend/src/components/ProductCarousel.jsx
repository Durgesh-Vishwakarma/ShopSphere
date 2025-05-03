import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import './ProductCarousel.css';

const ProductCarousel = () => {
   const { data: products, isLoading, error } = useGetTopProductsQuery();

   return (
      isLoading ? <Loader /> : (
         error ? (
            <Message variant='danger'>
              {error.data?.message || error.error || error.status || "Something went wrong"}
            </Message>
         ) : (
            <div className="carousel-wrapper">
              <Carousel pause='hover' className="product-carousel" indicators={false}>
                {products.map(product => (
                  <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <Image src={product.image} alt={product.name} className="carousel-image" />
                      <Carousel.Caption className="carousel-caption-custom">
                        <h2>
                          {product.name} <span className="carousel-price">(${product.price})</span>
                        </h2>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
         )
      )
   )
}

export default ProductCarousel;