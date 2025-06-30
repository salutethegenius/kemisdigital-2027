# KemisDigital - Static Frontend Application

A modern, static React application for KemisDigital's digital marketing services, built with Vite and optimized for static hosting.

## Features

- **Static Site Generation**: Pure frontend application with no server dependencies
- **Client-Side Payments**: Stripe Checkout integration for seamless payments
- **Contact Forms**: EmailJS integration for client-side email sending
- **Responsive Design**: Mobile-first design optimized for all devices
- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS, Framer Motion

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Environment Variables

### Required for Core Functionality
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID for contact forms
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID 
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key

### Required for Payments
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Optional
- `VITE_OPENAI_API_KEY` - OpenAI API key for AI chatbot features

## Payment Integration

This application uses Stripe Checkout for payments:

1. **Setup Stripe Products** in your Stripe Dashboard:
   - Basic Setup Package ($97)
   - Premium Setup Package ($197)

2. **Configure Payment Links** or use Stripe Checkout sessions

3. **Update Stripe Configuration** in `src/lib/stripe-client.ts`

## Deployment

This is a static site that can be deployed to:
- **Netlify** - Drag and drop the `dist` folder
- **Vercel** - Connect your Git repository
- **GitHub Pages** - Use GitHub Actions for automated deployment
- **Any Static Host** - Upload the `dist` folder contents

### Build Output
The build process creates a `dist` folder with all static assets optimized for production.

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions
│   ├── hooks/         # Custom React hooks
│   └── assets/        # Static assets
├── public/            # Public assets
└── dist/             # Production build output
```

## Key Benefits of Static Architecture

- **Performance**: Fast loading with CDN optimization
- **Cost Effective**: No server costs, only hosting
- **Scalability**: Handles traffic spikes automatically
- **Security**: No server-side vulnerabilities
- **Reliability**: No server downtime issues

## Support

For technical support or questions about deployment, contact the KemisDigital team.