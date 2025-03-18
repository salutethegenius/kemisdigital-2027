# KemisDigital Support Files

These files contain important configuration files and environment variables needed to run the KemisDigital project locally that weren't included in the GitHub repository.

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