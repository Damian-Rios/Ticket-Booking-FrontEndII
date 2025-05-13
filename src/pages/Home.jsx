import React, { useState } from "react";
import events from "../data/events";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  // State hooks for search query, sorting option, and loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("dateAsc");
  const [loading, setLoading] = useState(false);

  // Handles changes to the search input field
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handles changes to the sorting option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Sorts events based on the selected sorting option (price or date)
  const sortEvents = (events, option) => {
    let sorted = [...events];

    switch (option) {
      case "priceAsc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "dateAsc":
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "dateDesc":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }

    return sorted;
  };

  // Filters events by search query
  const filterEventsBySearch = (events, query) => {
    if (!query) return events;
    return events.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Applies both sorting and filtering to the event list
  const filteredSortedEvents = filterEventsBySearch(
    sortEvents(events, sortOption),
    searchQuery
  );

  // Simulates loading delay when searching for events
  const handleSearchClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulated loading time (1 second)
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Upcoming Events</h1>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Input */}
          <div className="flex flex-1 items-center space-x-2">
            <input
              type="text"
              placeholder="Search events by title"
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearchClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>

          {/* Sort Option */}
          <div className="flex items-center space-x-2 md:ml-4 md:justify-end">
            <label className="font-medium text-gray-700">Sort by:</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="dateAsc">Date: Old to New</option>
              <option value="dateDesc">Date: New to Old</option>
            </select>
          </div>
        </div>

        {/* Display Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">Loading...</div>
          ) : filteredSortedEvents.length > 0 ? (
            filteredSortedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => navigate(`/event/${event.id}`)} // Navigate to event detail page
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No events found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
