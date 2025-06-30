# KemisDigital - Digital Marketing & Software Solutions Platform

## Overview

KemisDigital is a comprehensive digital marketing and software development platform specifically designed for Startups, NGOs, and Tourism sectors in The Bahamas. The platform combines React/TypeScript frontend with Express backend, featuring AI-powered marketing tools, payment processing through Stripe, and extensive third-party integrations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom KemisDigital brand colors
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: SWR for data fetching and caching
- **Animations**: Framer Motion for smooth animations and transitions
- **Internationalization**: react-i18next (currently English-only)

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL via Neon hosting with Drizzle ORM
- **API Structure**: RESTful endpoints organized by feature domains
- **Error Handling**: Centralized error handling with custom ApiError class

### Key Design Decisions
- **Monorepo Structure**: Client and server code in single repository for easier development
- **TypeScript First**: Full TypeScript implementation for type safety
- **Component-First**: Modular component architecture for reusability
- **Mobile-First**: Responsive design optimized for Caribbean mobile usage

## Key Components

### Core Features
1. **AI-Powered Marketing Tools**
   - OpenAI GPT-4o integration for content generation
   - Automated chatbot responses for customer support
   - AI-enhanced marketing strategies

2. **Payment Processing**
   - Stripe integration for online payments
   - One-time setup fee model ($97) with transparent pricing
   - Support for Bahamian businesses without SSN through ITIN assistance

3. **Content Management**
   - Blog system with categories and tags
   - Press release management
   - Resource library with downloadable content

4. **Communication Systems**
   - EmailJS integration for contact forms
   - Nodemailer for server-side email handling
   - Calendar integration for appointment booking

### UI/UX Features
- **Brand Identity**: KemisDigital colors (Blue #00A0E3, Yellow #F7BE00)
- **Dark Theme**: Consistent dark mode throughout application
- **Sound Effects**: Audio feedback for user interactions
- **Accessibility**: ARIA-compliant components and keyboard navigation
- **SEO Optimization**: React Helmet for meta tags and structured data

## Data Flow

### Frontend Data Flow
1. **Component → SWR → API Endpoint → Database**
2. **Form Submission → Validation → API Call → Email/Database**
3. **Payment Flow → Stripe SDK → Payment Intent → Confirmation**

### Backend Data Flow
1. **Route Handler → Middleware → Business Logic → Database Query**
2. **Error Handling → Centralized Logger → Client Response**
3. **Email Processing → Nodemailer → External SMTP → Delivery**

### Database Schema
- **Users**: Authentication and profile management
- **Blog Posts**: Content management with categories/tags
- **Categories/Tags**: Content organization
- **Contact Forms**: Lead capture and communication

## External Dependencies

### Payment & Financial
- **Stripe**: Payment processing and subscription management
- **ITIN Services**: Tax identification support for Bahamian businesses

### Communication
- **EmailJS**: Client-side email sending
- **Nodemailer**: Server-side email automation
- **Gmail SMTP**: Email delivery service

### AI & Analytics
- **OpenAI API**: GPT-4o for AI-powered features
- **Plotly.js**: Data visualization and analytics

### Infrastructure
- **Neon**: PostgreSQL database hosting
- **Replit**: Development and deployment platform
- **Vite**: Build tool and development server

### UI/UX Libraries
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **React Hook Form**: Form handling and validation
- **Zod**: Runtime type validation

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit cloud development
- **Hot Module Replacement**: Real-time code updates during development
- **Environment Variables**: Separate configs for client and server

### Production Build
- **SSR Support**: Vite-powered server-side rendering capability
- **Static Asset Optimization**: Image optimization and caching
- **Code Splitting**: Lazy loading for optimal performance

### Database Strategy
- **PostgreSQL**: Hosted on Neon for reliability and scalability
- **Drizzle ORM**: Type-safe database queries and migrations
- **Connection Pooling**: Optimized database connections

### Security Considerations
- **CORS**: Configured for development and production environments
- **Error Handling**: Sanitized error responses for production
- **Environment Isolation**: Separate configurations for different environments

## Changelog
- June 30, 2025: Initial setup
- June 30, 2025: Fixed port configuration - Client on port 3000, Server on port 5000
- June 30, 2025: Resolved navigation menu issues and component overlapping
- June 30, 2025: Added Header/Footer to all pages with proper spacing
- June 30, 2025: Fixed Contact page React hooks errors and restored form functionality
- June 30, 2025: Added Meet page with navigation menu and beach background image
- June 30, 2025: Resolved SoundLink component ref errors using forwardRef
- June 30, 2025: Verified contact form email functionality working correctly

## User Preferences

Preferred communication style: Simple, everyday language.