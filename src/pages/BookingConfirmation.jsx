import React from 'react';

const BookingConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Card container for booking confirmation */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        {/* Title of the confirmation page */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">
          Booking Confirmed!
        </h1>

        {/* Confirmation message */}
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase. Your tickets have been booked successfully.
        </p>

        {/* Button to continue shopping */}
        <button
          onClick={() => window.location.replace('/')} // Redirect to home page
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
