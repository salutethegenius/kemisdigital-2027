# KemisDigital - Digital Marketing & Software Solutions Platform

## Overview

KemisDigital is a comprehensive digital marketing and software development platform specifically designed for Startups, NGOs, and Tourism sectors in The Bahamas. The platform combines React/TypeScript frontend with Express backend, featuring AI-powered marketing tools, payment processing through Stripe, and extensive third-party integrations.

## System Architecture

### Static Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized static builds
- **Styling**: Tailwind CSS with custom KemisDigital brand colors
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks and local state (no external APIs)
- **Animations**: Framer Motion for smooth animations and transitions
- **Internationalization**: react-i18next (currently English-only)

### Client-Side Integrations
- **Payments**: Stripe Checkout for hosted payment processing
- **Email**: EmailJS for client-side contact form submissions
- **AI Features**: OpenAI API for chatbot (optional)
- **Analytics**: Can integrate with Google Analytics or similar

### Key Design Decisions
- **Static Site Architecture**: No backend server required - pure frontend application
- **TypeScript First**: Full TypeScript implementation for type safety
- **Component-First**: Modular component architecture for reusability
- **Mobile-First**: Responsive design optimized for Caribbean mobile usage
- **JAMstack Approach**: JavaScript, APIs, and Markup for modern web development

## Key Components

### Core Features
1. **AI-Powered Marketing Tools**
   - OpenAI GPT-4o integration for content generation
   - Automated chatbot responses for customer support
   - AI-enhanced marketing strategies

2. **Payment Processing**
   - Stripe Checkout integration for secure online payments
   - One-time setup fee model ($97 Basic, $197 Premium) with transparent pricing
   - Client-side payment processing with hosted payment pages

3. **Content Management**
   - Static content pages with dynamic components
   - Resource library with downloadable content
   - SEO-optimized page structure

4. **Communication Systems**
   - EmailJS integration for client-side contact forms
   - Direct email integration without server requirements
   - WhatsApp and email contact options

### UI/UX Features
- **Brand Identity**: KemisDigital colors (Blue #00A0E3, Yellow #F7BE00)
- **Dark Theme**: Consistent dark mode throughout application
- **Sound Effects**: Audio feedback for user interactions
- **Accessibility**: ARIA-compliant components and keyboard navigation
- **SEO Optimization**: React Helmet for meta tags and structured data

## Data Flow

### Static Site Data Flow
1. **Component → Local State → UI Update**
2. **Form Submission → Client Validation → EmailJS → Email Delivery**
3. **Payment Flow → Stripe Checkout → Hosted Payment → Success/Cancel Redirect**

### External Service Integration
1. **Contact Forms → EmailJS → Email Service → Notification**
2. **Payments → Stripe Checkout → Payment Processing → Success Page**
3. **AI Features → OpenAI API → Response → Component Update**

### Content Management
- **Static Pages**: Pre-built HTML/CSS/JS served from CDN
- **Dynamic Content**: Client-side rendering with React components
- **Assets**: Optimized images and resources served statically

## External Dependencies

### Payment & Financial
- **Stripe**: Payment processing and subscription management
- **ITIN Services**: Tax identification support for Bahamian businesses

### Communication
- **EmailJS**: Client-side email sending for contact forms
- **Stripe**: Payment processing and checkout hosting

### AI & Analytics
- **OpenAI API**: GPT-4o for AI-powered chatbot features
- **Web Analytics**: Google Analytics or similar (configurable)

### Infrastructure
- **Vite**: Build tool and development server
- **Static Hosting**: Netlify, Vercel, or any CDN
- **Domain Management**: Custom domain configuration

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
- **Static Site Generation**: Optimized HTML, CSS, and JavaScript bundles
- **Asset Optimization**: Image optimization and lazy loading
- **Code Splitting**: Automatic chunking for optimal performance
- **CDN Ready**: All assets optimized for global CDN delivery

### Deployment Strategy
- **Static Hosting**: No server required - deploy to any static host
- **Build Output**: Single `dist` folder contains everything needed
- **Environment Variables**: Client-side environment configuration
- **Version Control**: Git-based deployment with automatic builds

### Security Considerations
- **Client-Side Security**: API keys properly scoped for frontend use
- **Payment Security**: Stripe handles all sensitive payment data
- **Form Security**: EmailJS provides secure form submission
- **HTTPS**: SSL/TLS encryption for all communications

## Changelog
- June 30, 2025: Initial setup with full-stack architecture
- June 30, 2025: Fixed port configuration - Client on port 3000, Server on port 5000
- June 30, 2025: Resolved navigation menu issues and component overlapping
- June 30, 2025: Added Header/Footer to all pages with proper spacing
- June 30, 2025: Fixed Contact page React hooks errors and restored form functionality
- June 30, 2025: Added Meet page with navigation menu and beach background image
- June 30, 2025: Resolved SoundLink component ref errors using forwardRef
- June 30, 2025: Verified contact form email functionality working correctly
- June 30, 2025: Removed sound effects system completely per user request
- June 30, 2025: **Major Architecture Change**: Converted to static frontend-only application
- June 30, 2025: Removed backend server dependencies entirely
- June 30, 2025: Implemented client-side Stripe Checkout integration
- June 30, 2025: Added static payment success page and improved error handling
- June 30, 2025: Created deployment-ready static site configuration

## User Preferences

Preferred communication style: Simple, everyday language.