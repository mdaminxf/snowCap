import React, { useEffect, useState } from "react";
import { FaStar, FaShoppingCart, FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import SideBar from "../Components/SideBar";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Footer from "../Components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setReviews(data.reviews || []);
        fetch(`https://dummyjson.com/products/category/${data.category}`)
          .then((res) => res.json())
          .then((data) => {
            const filtered = data.products.filter(
              (p) => p.id !== parseInt(id)
            );
            setRelatedProducts(filtered);
          });
      });
  }, [id]);

  const handleNextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
          <SideBar />

    <div className="container mx-auto px-4 py-8">
      
      <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Carousel */}
        <div className="w-full relative">
          {product.images && product.images.length > 0 && (
            <div className="relative">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.title} ${currentImageIndex + 1}`}
                className="w-full h-[400px] object-contain rounded-lg"
              />
              {/* Next/Previous Buttons */}
             {product.images.length > 1 && (
              <>
              
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <ArrowBigLeft />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              >
                <ArrowBigRight />
              </button>
              </>
             )}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {product.rating &&
                Array.from({ length: 5 }).map((_, i) => {
                  const rating = Math.floor(product.rating);
                  const isHalfStar = product.rating - rating >= 0.5;
                  if (i < rating) {
                    return <FaStar key={i} />;
                  } else if (i === rating && isHalfStar) {
                    return <FaStarHalfAlt key={i} />;
                  } else {
                    return <FaStar key={i} className="text-gray-300" />;
                  }
                })}
            </div>
            <span className="ml-2 text-gray-600">({reviews.length} Reviews)</span>
          </div>
          <p className="text-2xl font-bold text-green-600 mb-2">
            ${product.price?.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {product.availabilityStatus || "In Stock"}
          </p>
          {cart.some((item) => item.id === product.id) ? (
                  <div className="relative flex items-center">
                    <button
                      className="bg-white hover:bg-blue-200 border border-blue-300 rounded-l-lg p-2 h-10"
                      onClick={() => addToCart(product.id)}
                    >
                      +
                    </button>
                    <span className="px-4">
                      {cart.find((item) => item.id === product.id)?.qty}
                    </span>
                    <button
                      className="bg-white hover:bg-blue-200 border border-blue-300 rounded-r-lg p-2 h-10"
                      onClick={() => removeFromCart(product.id)}
                    >
                      -
                    </button>
                  </div>
                ) : (
                  <button
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => addToCart(product.id)}
                  >
                    Buy Me
                  </button>
                )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex items-center text-yellow-500 mb-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-800 mb-1">{review.comment}</p>
              <p className="text-sm text-gray-500">
                - {review.reviewerName} ({review.reviewerEmail})
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((items) => (
              <div
                key={items.id}
                className="border rounded-lg p-4 hover:shadow-md transition bg-white"
              >
                <img
                  src={items.thumbnail}
                  alt={items.title}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="text-lg font-bold">{items.title}</h3>
                <p className="text-gray-600 text-sm truncate">{items.description}</p>
                <p className="text-green-600 font-semibold mt-2">
                  ${items.price?.toFixed(2)}
                </p>
                {cart.some((item) => item.id === items.id) ? (
                  <div className="relative flex items-center">
                    <button
                      className="bg-white hover:bg-blue-200 border border-blue-300 rounded-l-lg p-2 h-10"
                      onClick={() => addToCart(product.id)}
                    >
                      +
                    </button>
                    <span className="px-4">
                      {cart.find((item) => item.id === product.id)?.qty}
                    </span>
                    <button
                      className="bg-white hover:bg-blue-200 border border-blue-300 rounded-r-lg p-2 h-10"
                      onClick={() => removeFromCart(product.id)}
                    >
                      -
                    </button>
                  </div>
                ) : (
                  <button
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => addToCart(product.id)}
                  >
                    Buy Me
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
    <Footer />
    </>
  );
};

export default ProductDetail;
