## 🛒 Full-Stack E-Commerce Platform

A modern full-stack e-commerce application with secure authentication, an admin dashboard, and a user shopping flow, built using a performance-focused stack.


## Backend

Bun – Fast JavaScript runtime
Hono – Lightweight web framework
PostgreSQL – Relational database
Drizzle ORM – Type-safe database queries

## Frontend

Next.js – React framework
shadcn/ui – UI components
TanStack Query – Server state management

## 💳 Payments

Stripe (integration planned)


## Authentication System

Secure signup and login
Access token (short-lived) + Refresh token (long-lived)
Automatic token refresh mechanism
Session tracking per device
Logout with session invalidation

## Admin Panel

Admin-only access (role-based)
Product management (Create, Update, Delete)
Order management
Protected admin APIs

#3 User Experience

Browse products
View product details
Add to cart
Checkout flow
Order history


## Code Setup
git clone your-repo-url.  After that, go to the clone folder using this command in the terminal
cd ecommerce

## Backend setup
cd backend
bun install
bun run dev

## For schema setup in PostgreSQL
bunx drizzle-kit generate
bunx drizzle-kit migrate

##Frontend setup
cd frontend
npm install
npm run dev
Same for the admin panel

## Important Notes

Cookies are HTTP-only for security

Refresh tokens are hashed in the DB

All admin routes are protected using middleware

Setup env By yourSelf for better Flow

Authentication is handled on both the frontend (UX) and the backend (security)
