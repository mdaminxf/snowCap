import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import Footer from '../Components/Footer';

const CheckOut = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);

    // Fetch product data only once
    const fetchCartProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        // Filter products based on cart items
        const cartProducts = data.products.filter(product =>
          items.some(item => item.id === product.id)
        );

        setProducts(cartProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCartProducts();
  }, []);

  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 16) {
      value = value.slice(0, 16); // Limit to 16 digits
    }
    value = value.replace(/(\d{4})(?=\d)/g, '$1-'); // Add dash after every 4 digits
    e.target.value = value; // Update input field
  };

  const formatExpirationDate = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 4) {
      value = value.slice(0, 4); // Limit to 4 digits
    }
    value = value.replace(/(\d{2})(?=\d)/g, '$1/'); // Add slash after the first two digits (MM/YY format)
    e.target.value = value; // Update input field
  };

  const formatCVV = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 3) {
      value = value.slice(0, 3); // Limit to 3 digits
    }
    e.target.value = value; // Update input field
  };

  const onSubmit = (data) => {
    console.log("Payment data: ", data);

    // Simulate successful payment
    navigate('/payment-success');
  };

  return (
    <>
    <SideBar />
    <div className="font-sans min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3 p-8">
            <h2 className="text-3xl font-bold text-gray-800">Checkout</h2>
            <p className="text-gray-500 mt-2">
              Complete your purchase with our secure payment process.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-4">
                {/* Card Number Field */}
                <div>
                  <label className="block text-gray-700 font-medium">Card Number</label>
                  <input
                    type="text"
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="1234 5678 9012 3456"
                    {...register('cardNumber', { required: 'Card number is required' })}
                    onInput={formatCardNumber}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                  )}
                </div>

                {/* Expiration Date and CVV Fields */}
                <div className="flex space-x-4">
                  {/* Expiration Date */}
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">Expiration Date</label>
                    <input
                      type="text"
                      className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="MM/YY"
                      {...register('expDate', { required: 'Expiration date is required' })}
                      onInput={formatExpirationDate}
                    />
                    {errors.expDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.expDate.message}</p>
                    )}
                  </div>

                  {/* CVV */}
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">CVV</label>
                    <input
                      type="text"
                      className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="123"
                      {...register('cvv', { required: 'CVV is required' })}
                      onInput={formatCVV}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
              >
                Complete Purchase
              </button>
            </form>
          </div>

          <div className="md:w-1/3 bg-gray-100 p-8 rounded-r-lg">
            <h3 className="text-2xl font-semibold text-gray-800">Order Summary</h3>
            <div className="mt-4 space-y-4">
              {cartItems.map((item) => {
                const product = products.find((product) => product.id === item.id);
                return (
                  product && (
                    <div key={item.id} className="flex items-center justify-between text-gray-600">
                      <img
                        src={product.thumbnail || 'https://via.placeholder.com/150'}
                        alt={product.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <h4 className="text-sm font-medium">{product.title}</h4>
                        <p className="text-sm">Qty: {item.qty}</p>
                      </div>
                      <span className="text-gray-800 font-semibold">
                        ${(product.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  )
                );
              })}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>
                ${cartItems.reduce((total, item) => {
                  const product = products.find((product) => product.id === item.id);
                  return total + (product ? product.price * item.qty : 0);
                }, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CheckOut;
