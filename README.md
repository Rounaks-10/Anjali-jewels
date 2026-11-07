# Anjali Jewels

<div align="center">

**A premium jewellery storefront where elegant design meets a complete shopping experience.**

[![React](https://img.shields.io/badge/React-19-20232A?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs)](https://nodejs.org/)

</div>

Anjali Jewels is a full-stack jewellery e-commerce experience designed around rich product presentation, polished storefront interactions, and an inviting luxury visual identity.

The customer interface is the primary focus: editorial home sections, carefully art-directed category imagery, expressive typography, motion, responsive layouts, and focused product journeys come together to create a premium digital jewellery catalogue.

## Frontend Design Experience

### Visual storytelling

- Large-format imagery and video-led sections inspired by modern jewellery campaigns
- Dedicated collections, categories, arrivals, gifts, quality, and brand-story sections
- Editorial layouts that balance bold headlines with restrained, luxury-focused spacing
- Distinct visual treatments for occasions, collections, men, women, and children's jewellery

### Product discovery

- Browsable jewellery catalogue with collection and price-range filtering
- Dedicated product detail pages with a clean, conversion-focused presentation
- Category imagery for necklaces, earrings, rings, bangles, bracelets, pendants, chains, and mangalsutra
- Search-friendly URLs and reusable jewellery assets generated from the project manifest script

### Shopping interactions

- Persistent cart with add, remove, and quantity controls
- Wishlist for saving preferred pieces
- Login and OTP verification flows
- Checkout and order history screens
- Responsive navigation and mobile-friendly browsing

### Interface motion and polish

- Animated image and content transitions powered by Framer Motion
- Carousels and immersive home-page sections
- Toast notifications for quick, accessible feedback
- Tailwind CSS utilities paired with custom typography and keyframe animation

## User Journey

```text
Home
  -> Explore collections and categories
  -> Browse all jewellery
  -> Filter products and open product details
  -> Add to cart or wishlist
  -> Login and verify account
  -> Place an order
  -> View order history
```

## Storefront Pages

| Route | Experience |
| --- | --- |
| `/` | Editorial landing page with carousels, collections, categories, stories, and brand highlights |
| `/alljewellery` | Product catalogue with discovery and filtering |
| `/product/:productSlug` | Individual jewellery product details |
| `/wishlist` | Saved products |
| `/cart` | Shopping bag and quantity management |
| `/login` | Customer authentication |
| `/verify-otp` | OTP verification |
| `/place-order` | Checkout |
| `/orders` | Customer order history |
| `/contact` | Customer contact form |

## Design System

The storefront combines Tailwind CSS with project-specific styling:

- **Typography:** editorial headings, product labels, filter controls, and luxury display accents
- **Color:** warm neutrals, burgundy and jewellery-inspired accent tones, and clean product backgrounds
- **Imagery:** curated WebP, JPG, SVG, and video assets optimized for campaign-like presentation
- **Components:** reusable navigation, carousel, category, collection, filter, story, quality, and footer sections
- **Layout:** responsive page gutters from mobile through desktop, plus section-specific compositions
- **Feedback:** React Toastify notifications for user actions and API outcomes

## Project Structure

```text
Anjali Jewleries/
├── frontend/          Customer-facing React storefront
│   ├── public/        Campaign imagery, icons, and product media
│   ├── scripts/       Jewellery manifest generator
│   └── src/
│       ├── components/Reusable storefront sections and UI
│       ├── context/   Cart and customer state
│       └── pages/     Route-level storefront experiences
├── admin/             React administration dashboard
│   └── src/
│       ├── components/Navbar, sidebar, and authentication
│       └── pages/     Product, catalogue, and order management
└── backend/           Express API and MongoDB integration
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── services/
```

## Technology

### Frontend

- React 19
- React Router 7
- Tailwind CSS 4
- Framer Motion
- Axios
- React Toastify
- Vite 8

### Admin

- React 19 and React Router
- Tailwind CSS 4
- Axios
- React Toastify
- Vite

### Backend

- Node.js and Express
- MongoDB and Mongoose
- Cloudinary
- JWT authentication
- Brevo email services
- Razorpay payment integration
- Multer uploads

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB connection
- Cloudinary account
- Optional API credentials for email and Razorpay features

### 1. Install dependencies

Run these commands in separate terminals:

```powershell
cd frontend
npm install
```

```powershell
cd admin
npm install
```

```powershell
cd backend
npm install
```

### 2. Configure environment variables

Create `frontend/.env` with:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Create `admin/.env` with:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Create `backend/.env` with the variables required by the services you use:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

BREVO_API_KEY=your_brevo_api_key
BUSINESS_EMAIL=business@example.com

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 3. Run the project

Backend:

```powershell
cd backend
npm run server
```

Storefront:

```powershell
cd frontend
npm run dev
```

Admin dashboard:

```powershell
cd admin
npm run dev
```

The default local URLs are:

- Storefront: `http://localhost:5173`
- Backend API: `http://localhost:4000`
- Admin: typically `http://localhost:5174` when both Vite apps run together

## Useful Commands

### Storefront

```powershell
npm run dev                 # Start the development server
npm run build               # Create a production build
npm run preview             # Preview the production build
npm run lint                # Run ESLint
npm run generate:jewellery  # Regenerate jewellery product assets manifest
```

### Admin

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```powershell
npm start
# or
npm run server
```

## API Areas

The backend exposes grouped routes for:

- Products and catalogue management
- Customer registration, login, and OTP verification
- Shopping cart data
- Orders and payment processing
- Contact and enquiry submission

## Future Enhancements

- Add storefront screenshots and interaction previews
- Expand product filtering by material, design, occasion, and price
- Add richer accessibility and keyboard-navigation states
- Build a reusable component storybook
- Improve image loading, responsive crops, and performance budgets
- Add automated frontend and end-to-end UI tests
