# KemisDigital - Digital Marketing & Software Solutions

KemisDigital is a comprehensive digital marketing and software development platform designed to empower Startups, NGOs, and Tourism sectors through intelligent technological solutions. The platform delivers dynamic web applications with integrated services and sophisticated user experiences.

## Tech Stack:
- React with TypeScript
- Shadcn UI Components
- OpenAI API Integration
- Stripe Payment Integration
- EmailJS for Contact Form
- Responsive web design
- Modular component architecture
- Tailwind CSS for styling and animations

## Recent Updates:
- Added Payment Solutions page with Stripe integration for businesses in The Bahamas
- Updated payment processing to use one-time $97 setup fee model
- Implemented comprehensive pricing information including transaction fees

## File Contents:

- **root.env**: Environment variables for the main application (rename to .env in root directory)
- **client.env**: Environment variables for the client application (rename to .env in client directory)
- **.replit**: Replit configuration
- **replit.nix**: Nix package configuration for Replit
- **drizzle.config.ts**: Database ORM configuration
- **package.json**: Main package dependencies
- **tsconfig.json**: TypeScript configuration
- **vite.config.ts**: Vite bundler configuration
- **postcss.config.js**: PostCSS configuration
- **tailwind.config.ts**: Tailwind CSS configuration
- **components.json**: UI component configuration

## Setup Instructions:

1. Create a `.env` file in the root directory with the contents from the provided `root.env` file
2. Create a `.env` file in the client directory with the contents from the provided `client.env` file
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server

## Database Configuration:

The project uses a PostgreSQL database hosted on Neon. The connection URL is included in the `root.env` file.

## Environment Variables:

Make sure to replace any placeholders in the environment files with your actual API keys and credentials if needed.

## Payment Solutions

The Payment Solutions page provides information about Stripe integration services for businesses in The Bahamas:

- **One-time Setup Fee**: $97 (not a monthly subscription)
- **Transaction Fees**: 6.5% per transaction
- **Volume Discounts**: Available for businesses processing larger amounts
- **Features**:
  - Stripe Account Creation & Configuration
  - Dashboard Access & Training
  - Integration Support
  - ITIN Assistance for Tax Compliance
  
To enable the payment functionality, you'll need to add your Stripe API keys to the environment variables in the client.env file:
- `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `VITE_STRIPE_SECRET_KEY`: Your Stripe secret key (server-side only)

## Security Improvements

### 1. Security Headers (Production Only)
- **Strict-Transport-Security (HSTS)** — enforces HTTPS
- **X-Frame-Options** — prevents clickjacking
- **X-Content-Type-Options** — prevents MIME sniffing
- **X-XSS-Protection** — XSS protection
- **Referrer-Policy** — controls referrer information
- **Content-Security-Policy (CSP)** — restricts resource loading
- **Permissions-Policy** — restricts browser features

### 2. API Security
- **Rate limiting** — 5-10 requests per minute per IP
- **Input sanitization** — trims and limits input length (1000 chars max)
- **Email validation** — regex validation
- **Content-Type validation** — only accepts JSON
- **Payload size limits** — prevents oversized payloads (10-50KB max)
- **HTML escaping** — prevents XSS in email content

### 3. Admin API Security
- Prefers **Authorization header** over query params (query params can be logged)
- Still supports query params for backward compatibility
- Protected endpoints require `ADMIN_API_KEY` environment variable

### What This Protects Against
| Attack | Protection |
|--------|------------|
| XSS attacks | CSP and X-XSS-Protection |
| Clickjacking | X-Frame-Options |
| MIME sniffing | X-Content-Type-Options |
| Man-in-the-middle | HSTS enforces HTTPS |
| Rate limit abuse | Rate limiting on form submissions |
| Injection attacks | Input sanitization |
| Data exposure | Better API key handling |

### Additional Recommendations
- **HTTPS** — Railway handles this automatically
- **Environment variables** — Ensure all secrets are set in Railway
- **Database security** — Use RLS policies if using Supabase
- **Monitoring** — Consider adding logging/monitoring for production