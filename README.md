## 🛒 Full-Stack E-Commerce Platform

A modern full-stack e-commerce application with secure authentication, admin dashboard, and user shopping flow, built using a performance-focused stack.


##  Backend
Bun – Fast JavaScript runtime
Hono – Lightweight web framework
PostgreSQL – Relational database
Drizzle ORM – Type-safe database queries
## Frontend
Next.js – React framework
shadcn/ui – UI components
TanStack Query – Server state management
## Authentication & Security
JWT (Access + Refresh Tokens)
HTTP-only cookies
Session management with hashed refresh tokens
Role-based access control (Admin/User)

## Payments
Stripe (integration planned)

## Admin Panel
Admin-only access (role-based)
Product management (Create, Update, Delete)
Order management
Protected admin APIs

## Authentication Flow
User logs in → receives:
1. Access Token (short-lived)
* Refresh Token (stored in cookie + DB)
* Access token is used for API requests
2. If access token expires:
*Frontend calls /auth/refresh
*New access token is issued
3. If refresh token expires:
* User must log in again

 ## Setup Instructions
1. Clone the repo
git clone -repo-url

## Development Focus

This project focuses on:

Clean backend architecture
Secure authentication system
Scalable database design
Real-world e-commerce workflows
