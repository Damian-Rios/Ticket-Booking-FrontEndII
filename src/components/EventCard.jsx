import React from "react";

// EventCard component displays information about a single event.
// Props:
// - event: an object containing event details (thumbnail, title, date, location, price).
// - onClick: a function to handle click events on the card.
const EventCard = ({ event, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden border border-gray-200"
    >
      {/* Event image with hover zoom effect */}
      <div className="overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Event details: title, date, location, and price */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          {event.date} &bull; {event.location}
        </p>
        <p className="text-base font-medium text-blue-600">${event.price}</p>
      </div>
    </div>
  );
};

export default EventCard;
