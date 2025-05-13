import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const CartPage = () => {
  // Access cart data and actions from CartContext
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Get current user from authentication context
  const { user } = useAuth(); 
  const navigate = useNavigate();

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to remove an item from the cart
  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  // Handle the checkout process
  const handleCheckout = async () => {
    if (!user) {
      alert('You must be logged in to complete a booking.');
      return;
    }

    try {
      // Reference to the "bookings" collection in Firestore
      const bookingRef = collection(db, 'bookings');

      // Add the booking document to Firestore
      await addDoc(bookingRef, {
        userId: user.uid,
        email: user.email,
        items: cart,
        total: totalPrice,
        createdAt: Timestamp.now(),
      });

      // Clear the cart from localStorage
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage')); // Trigger any listeners for changes

      // Redirect to the success page after booking is complete
      navigate('/success');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <Navbar /> {/* Navbar component */}
      <div className="container mx-auto p-6 bg-white rounded-md shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Shopping Cart</h1>

        <section>
          <h2 className="text-2xl font-medium text-gray-700 mb-4 text-center">Items in your shopping cart</h2>
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty. Browse events and add them to your cart!</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
                  <div className="flex items-center">
                    <img src={item.thumbnail} alt={item.title} style={{ width: '100px', height: 'auto' }} className="mr-4" />
                    <div>
                      <h3>
                        <a href={`/event/${item.id}`} className="text-blue-600 hover:text-blue-800">
                          {item.title}
                        </a>
                      </h3>
                      <p className="text-gray-600">${item.price} x {item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Buttons to adjust item quantity */}
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300">-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300">+</button>
                  </div>

                  {/* Button to remove item from cart */}
                  <button type="button" onClick={() => handleRemove(item.id)} className="text-red-600 hover:text-red-800 flex items-center">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    <span>Remove</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Display price details and checkout button if cart is not empty */}
        {cart.length > 0 && (
          <section className="mt-6">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Price Details</h2>
            <dl>
              <div className="flex justify-between text-gray-600">
                <dt>Price ({cart.length} item{cart.length > 1 ? 's' : ''})</dt>
                <dd>${totalPrice.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>Total Amount</dt>
                <dd>${totalPrice.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-4">
              {/* Checkout button */}
              <button type="button" onClick={handleCheckout} className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Checkout</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CartPage;
