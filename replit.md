# CalorieTracker App

## Overview

This is a full-stack calorie tracking application built with React (frontend) and Express.js (backend). The app allows users to analyze food descriptions using AI and track their daily calorie intake with detailed macronutrient breakdown.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: Redux Toolkit for global state management
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

## Key Components

### Frontend Components
- **Daily Summary**: Displays calorie progress with circular progress indicator and macronutrient breakdown
- **Food Input**: Text area for describing food items to be analyzed by AI
- **Food History**: Shows today's logged food entries with nutritional information
- **Weekly Progress**: Visual representation of weekly calorie intake
- **Analysis Modal**: Displays AI-analyzed food data before adding to log
- **Bottom Navigation**: Mobile-friendly navigation bar

### Backend Services
- **OpenAI Integration**: Uses GPT-4o for food analysis and nutritional data extraction
- **Storage Layer**: PostgreSQL database integration using Drizzle ORM with DatabaseStorage implementation
- **API Routes**: RESTful endpoints for food analysis and CRUD operations

### Database Schema
- **Users Table**: User information with daily calorie goals (PostgreSQL with UUID primary keys)
- **Food Entries Table**: Detailed nutritional information for logged foods including macronutrient percentages (PostgreSQL with timestamps)

## Data Flow

1. **Food Analysis Flow**:
   - User enters food description in input component
   - Frontend sends description to `/api/foods/analyze` endpoint
   - Backend calls OpenAI API with structured prompt
   - AI returns nutritional analysis in JSON format
   - Analysis displayed in modal for user confirmation
   - User can add analyzed food to daily log

2. **Food Logging Flow**:
   - Confirmed food analysis sent to `/api/foods` endpoint
   - Backend creates food entry with user association
   - Frontend updates local state and invalidates queries
   - Daily summary automatically recalculates totals

3. **Data Retrieval Flow**:
   - Frontend fetches today's entries from `/api/foods/today`
   - Redux store manages today's entries state
   - Components reactively update based on state changes

## External Dependencies

### Core Dependencies
- **AI Service**: OpenAI GPT-4o for food nutritional analysis
- **Database**: Neon Database (PostgreSQL) configured via Drizzle
- **UI Components**: Extensive Radix UI component library
- **Development Tools**: Replit-specific plugins for development environment

### Key Libraries
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@reduxjs/toolkit**: Predictable state management
- **zod**: Runtime type validation and schema definitions
- **tailwindcss**: Utility-first CSS framework

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **Backend**: Express server with live reloading via tsx
- **Database**: Drizzle push for schema synchronization

### Production Build
- **Frontend**: Vite builds optimized React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Deployment**: Single Node.js process serving both static files and API

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **AI Service**: OpenAI API key via `OPENAI_API_KEY` environment variable
- **Session Storage**: PostgreSQL-backed session store using `connect-pg-simple`

### Mobile-First Design
- **Responsive**: Tailwind CSS with mobile-first breakpoints
- **PWA-Ready**: Service worker and offline capabilities can be added
- **Touch-Friendly**: Large touch targets and mobile navigation patterns