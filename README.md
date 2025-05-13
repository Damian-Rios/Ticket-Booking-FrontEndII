# Ticket-Booking-FrontEndII
# Eventify
Eventify is a responsive event ticketing web app built with React. Users can register, log in, browse events, add them to a cart, and proceed to checkout. Firebase powers the authentication and activity logging system.

## Features
- User authentication (register, login, logout) via Firebase

- Cart system to manage selected event tickets

- Firebase Firestore logging of user activity (e.g., login, signup)

- React Context API for global state management

- Clean UI with Tailwind CSS

- Protected routes using react-router-dom

## Technologies Used
- React

- React Router DOM

- Firebase Authentication

- Firebase Firestore

- Tailwind CSS

- Vite

## Getting Started
1. Clone the repository
```
git clone https://github.com/Damian-Rios/Ticket-Booking-FrontEndII.git
cd ticket-booking
```
2. Install dependencies
```
npm install
```
3. Set up Firebase
Go to Firebase Console

Create a project and enable Email/Password Authentication

Create a Firestore database

Copy your config and paste it into firebase.js:

4. Run the development server
```
npm run dev
```

## Testing Authentication
Register a new account on the app

Check that Firestore logs are created in activityLogs

Logout from the navbar and try logging in again

Visit /cart or /profile to test navigation

## Test Key Features:

 Register a new user

 Log in and verify session persistence

 Add items to cart (can use static items or context-managed list)

 Checkout flow (can mock logic for now)

 Log out and verify redirect

 Try accessing /profile or /cart while logged out (should redirect to /login)