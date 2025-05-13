import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, setDisplayName } = useAuth(); // Retrieve user info and setDisplayName function from context
  const [nameInput, setNameInput] = useState(''); // State for the display name input field
  const [message, setMessage] = useState(''); // State for displaying a message after saving the name
  const [bookings, setBookings] = useState([]); // State for storing bookings data

  // Function to handle saving the display name
  const handleSaveName = async () => {
    try {
      await setDisplayName(nameInput); // Save the display name
      setMessage("Display name saved!"); // Set success message
      toast.success("Display name updated successfully!"); // Show success toast
      setNameInput(''); // Clear the input field
    } catch (error) {
      console.error("Error saving display name:", error);
      setMessage("Error saving name."); // Set error message
      toast.error("Error updating display name."); // Show error toast
    }
  };

  // Fetch the user's bookings when the component mounts or user changes
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return; // Return early if no user is logged in

      try {
        const bookingsRef = collection(db, 'bookings'); // Reference to bookings collection
        const q = query(bookingsRef, where('userId', '==', user.uid)); // Query to get bookings by user
        const querySnapshot = await getDocs(q); // Fetch data

        // Map over the fetched documents to extract booking data
        const fetchedBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(fetchedBookings); // Set fetched bookings to state
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [user]); // Dependency array to trigger effect when the user changes

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome, {user.displayName || user.email} {/* Display user's name or email */}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            <strong>Email:</strong> {user.email} {/* Display user's email */}
          </p>

          {!user.displayName && ( // Show name input only if display name is not set
            <div className="mb-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)} // Handle input change
                placeholder="Enter display name"
                className="w-full p-3 border border-gray-300 rounded-md mb-2"
              />
              <button
                onClick={handleSaveName} // Handle save button click
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
              {message && <p className="mt-2 text-center text-green-600">{message}</p>} {/* Display message after saving */}
            </div>
          )}

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking History</h2>
          {bookings.length === 0 ? (
            <p className="text-center text-gray-500">No bookings found.</p> // Display message if no bookings are found
          ) : (
            <ul className="space-y-4">
              {bookings.map(booking => (
                <li key={booking.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
                  <p><strong>Date:</strong> 
                    {booking.createdAt?.toDate ? booking.createdAt.toDate().toLocaleString() : 'N/A'} {/* Format date */}
                  </p>
                  <p><strong>Total:</strong> ${booking.total?.toFixed(2)} {/* Format total */}
                  </p>
                  <ul className="ml-4 space-y-2">
                    {booking.items?.map(item => (
                      <li key={item.id} className="text-sm text-gray-600">
                        {item.title} – {item.quantity} × ${item.price} {/* List each item */}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          {/* Toast container for displaying success/error messages */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
