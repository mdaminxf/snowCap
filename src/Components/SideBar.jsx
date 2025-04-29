// SideBar.js
import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ChevronLeft, ChevronRight, Search, User, ShoppingCart, Package } from 'lucide-react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';




export default function SideBar() {
  const { cart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [open, setOpen]= useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [SearchProducts, setSearchProducts] = useState([]);
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Server error: ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        const cartItemIds = cart.map((item) => item.id);
        const filteredProducts = data.products.filter((product) => cartItemIds.includes(product.id));
        setProducts(filteredProducts);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [cart]);
  
  const handleCheckoutClick = (e) => {
    e.preventDefault();
    navigate('/checkout');
  };

  const handleChange = (e)=>{
    if(e)
    {
      setShowSearch(true);
      fetch(`https://dummyjson.com/products/search?q=${e}`)
      .then(res => res.json())
      .then((data)=>{
        setSearchProducts(data.products)
      });
    }
    else
      setShowSearch(false);
  }
  const handleSearch = () => {
    const searchInput = document.querySelector('input[type="text"]').value;
    navigate(`/products/${searchInput}`);
  };
  return (
    <div>
      <header
        className={`${
          isSticky ? 'sticky top-0 z-50 shadow-lg' : ''
        } bg-gradient-to-r from-sky-500 via-violet-500 to-blue-500 text-gray-700 p-4 flex flex-col md:flex-row justify-between items-center gap-2 transition-shadow duration-300`}
      >
        <div className="text-xl font-bold text-white flex items-center gap-2">
          <a href="/" className="hover:underline">
            SNOWCAP
          </a>
        </div>
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search Products..."
            className="w-full px-4 py-2 text-black rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search onClick={handleSearch} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
          {showSearch && (
            <div className="absolute z-10 bg-white w-full max-h-80 overflow-y-auto rounded shadow-lg px-4 py-2">
              <ul>
                {SearchProducts.map((product) => (
                  <li
                    key={product.id}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <a href={`/product/${product.id}`} className=''>
                    {product.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex space-x-4 text-sm text-white items-center">
          <a href="/account" className="hover:underline flex items-center gap-1">
            <User size={16} /> Account
          </a>
          <a href="/checkout" className="hover:underline flex items-center gap-1">
            <Package size={16} /> Orders
          </a>
          <button
            onClick={() => setOpen(true)}
            className="hover:underline flex items-center gap-1"
          >
            <ShoppingCart size={16} /> Cart
          </button>
        </div>
      </header>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl rounded-lg">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping Cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {products.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.thumbnail}
                                  alt={product.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-2 flex flex-1 flex-col">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">
                                    {product.title}
                                  </h3>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>{product.rating} ⭐</p>
                                    <p className="ml-4">${product.price}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty: {cart.find((item) => item.id === product.id)?.qty}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(product.id)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        $
                        {cart.reduce(
                          (total, item) =>
                            total +
                            item.qty *
                              products.find((product) => product.id === item.id)?.price,
                          0
                        )}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={handleCheckoutClick}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
