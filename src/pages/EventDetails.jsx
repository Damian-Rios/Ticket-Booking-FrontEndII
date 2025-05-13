import { useParams, useNavigate } from "react-router-dom";
import events from "../data/events"; // Static event data
import { CartContext } from "../contexts/CartContext";
import React from "react";
import { toast, ToastContainer } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

const EventDetails = () => {
  const { eventId } = useParams(); // Get eventId from URL
  const { addToCart } = React.useContext(CartContext); // Get addToCart function from context
  const navigate = useNavigate();

  // Find the event details based on eventId
  const event = events.find((event) => event.id === parseInt(eventId));

  // If event not found, show a message
  if (!event) {
    return <p className="text-center text-red-500">Event not found.</p>;
  }

  // Destructure event details
  const { thumbnail, title, price, description, location, date } = event;

  // Format the event date
  const eventDate = new Date(date).toLocaleString();

  // Add event to cart and show success toast notification
  const handleAddToCart = () => {
    addToCart(event);
    toast.success(`${title} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
    setTimeout(() => {
      navigate("/"); // Navigate back to home after 3 seconds
    }, 3000);
  };

  // Navigate back to the previous page
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">{title}</h2>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-auto mb-4 rounded-lg shadow-lg"
      />
      <p className="text-lg text-gray-700 mb-4">
        <strong>Description:</strong> {description}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Location:</strong> {location}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Date & Time:</strong> {eventDate}
      </p>
      <p className="text-lg font-bold text-gray-900 mb-4">
        <strong>Price per Ticket:</strong> ${price.toFixed(2)}
      </p>

      {/* Optional Google Maps iframe showing event location */}
      <div className="event-location mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Location:</h3>
        <iframe
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
          className="rounded-lg shadow-md"
          src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(location)}&key=AIzaSyDKiahhxZBXxlUSVR87-DabQhyWR8Hif74`}
        ></iframe>
      </div>

      {/* Button to add event to cart */}
      <button
        onClick={handleAddToCart}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
      >
        Add to Cart
      </button>

      {/* Button to go back to the previous page */}
      <button
        onClick={handleGoBack}
        className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
      >
        Go Back
      </button>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default EventDetails;
