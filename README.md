## TechHaven
TechHaven is a modern e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse products, manage their cart, and manage a wishlist. The app is fully responsive and optimized for both desktop and mobile devices.

## Features
  User Authentication: Users can sign up, log in, and manage their accounts.
  Add to Cart: Users can add items to their cart for easy checkout.
  Update Cart: Users can modify quantities or remove items from the cart.
  Delete from Cart: Users can remove items from the cart.
  Add to Wishlist: Users can save their favorite items to the wishlist for later.
  Delete from Wishlist: Users can remove items from their wishlist.
  Fully Responsive: The app is designed to be responsive and works well on both desktop and mobile devices.

## Tech Stack
  Frontend: React, React Router, Axios, Tailwind CSS
  Backend: Node.js, Express.js
  Database: MongoDB
  Authentication: JWT (JSON Web Tokens)

## Project Structure
  The project is divided into two main folders:

  CLIENT: Contains the frontend React application.
  SERVER: Contains the backend Express server.

## Installation
  1. Clone the repository:
       git clone https://github.com/DakshChawla12/TECH-HAVEN.git
       cd TechHaven
  2. Install dependencies for the server:
       cd SERVER
       npm install
  3. Install dependencies for the client:
       cd CLIENT
       npm install
  4. Set up environment variables: You will need to create a .env file in the server folder with the following variables
       MONGO_URI=your_mongo_database_url
       JWT_SECRET=your_jwt_secret
       PORT=your_preferred_port

  5. Run the application:
       Start the SERVER (backend):
         cd SERVER
         npm run dev
       Start the CLIENT (frontend):
         cd CLIENT
         npm run dev

## API Endpoints

### User Authentication
- **POST** `/auth/signup` - Register a new user
- **POST** `/auth/login` - Log in an existing user

### Cart Management
- **GET** `/user/cart` - Retrieve user's cart
- **POST** `/user/cart/addToCart` - Add an item to the cart
- **DELETE** `/user/cart/:itemId` - Remove an item from the cart
- **POST** `/user/cart/:itemId` - Update an item in the cart

### Wishlist Management
- **GET** `/user/wishlist` - Retrieve user's wishlist
- **POST** `/user/wishlist` - Add an item to the wishlist
- **DELETE** `/user/wishlist/:itemId` - Remove an item from the wishlist

