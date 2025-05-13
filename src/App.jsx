import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingConfirmation from "./pages/BookingConfirmation";

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/success" element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            } />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
