# CalorieTracker

A modern, AI-powered calorie tracking web application built with React, Redux, and PostgreSQL. Simply describe your food in natural language and get instant nutritional analysis with detailed macronutrient breakdowns.

<img width="400"  alt="image" src="https://github.com/user-attachments/assets/f85a811f-3ae4-40bb-9e9d-49eb53a4b762" />


## Features

- **AI-Powered Food Analysis**: Describe any food (e.g., "grilled chicken with rice") and get detailed nutritional information using OpenAI GPT-4o
- **Comprehensive Macro Tracking**: Track protein, carbs, fat, and alcohol with percentage breakdowns
- **Daily Progress Visualization**: Circular progress indicator showing calorie intake vs. goals
- **Weekly Trends**: Visual representation of your 7-day calorie history
- **Mobile-First Design**: Responsive interface optimized for smartphones and tablets
- **Real-Time Updates**: Instant UI updates with optimistic loading states
- **Persistent Storage**: PostgreSQL database for reliable data persistence

## Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Redux Toolkit** for predictable state management
- **Tailwind CSS** for responsive, utility-first styling
- **Shadcn/ui** components built on Radix UI primitives
- **TanStack Query** for server state management and caching
- **Wouter** for lightweight client-side routing

### Backend
- **Express.js** with TypeScript for the REST API
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** (Neon) for persistent data storage
- **OpenAI GPT-4o** for intelligent food analysis
- **Zod** for runtime type validation and schema definitions

### Development Tools
- **Vite** for fast development and optimized builds
- **ESBuild** for production bundling
- **TypeScript** for type safety across the stack

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database (or use the provided Neon setup)
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   DATABASE_URL=your_postgresql_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## API Endpoints

### Food Analysis
- `POST /api/foods/analyze` - Analyze food description with AI
  ```json
  {
    "description": "grilled chicken breast with rice and broccoli"
  }
  ```

### Food Entries
- `GET /api/foods/today` - Get today's food entries
- `GET /api/foods` - Get all food entries for user
- `POST /api/foods` - Add a new food entry

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `username` (Text, Unique)
- `password` (Text)
- `dailyCalorieGoal` (Integer, Default: 2000)

### Food Entries Table
- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key)
- `name` (Text)
- `description` (Text)
- `calories` (Integer)
- `protein` (Real) - grams
- `carbs` (Real) - grams
- `fat` (Real) - grams
- `alcohol` (Real) - grams
- `proteinPercent` (Real) - percentage of total calories
- `carbsPercent` (Real) - percentage of total calories
- `fatPercent` (Real) - percentage of total calories
- `alcoholPercent` (Real) - percentage of total calories
- `createdAt` (Timestamp)

## Project Structure

```
├── client/src/
│   ├── components/          # React components
│   │   ├── daily-summary.tsx    # Calorie progress and macro breakdown
│   │   ├── food-input.tsx       # AI-powered food analysis input
│   │   ├── food-history.tsx     # Today's logged meals
│   │   ├── weekly-progress.tsx  # 7-day visualization
│   │   ├── analysis-modal.tsx   # AI results confirmation
│   │   └── bottom-navigation.tsx # Mobile navigation
│   ├── store/               # Redux state management
│   │   ├── index.ts             # Store configuration
│   │   └── foodSlice.ts         # Food entries state
│   ├── pages/               # Route components
│   └── lib/                 # Utilities and configurations
├── server/
│   ├── services/            # Business logic
│   │   └── openai.ts            # AI food analysis service
│   ├── db.ts                # Database connection
│   ├── storage.ts           # Data access layer
│   ├── routes.ts            # API endpoints
│   └── index.ts             # Express server setup
├── shared/
│   └── schema.ts            # Shared data models and validation
└── package.json
```

## How It Works

1. **Food Analysis Flow**:
   - User enters food description (e.g., "chicken caesar salad")
   - Frontend sends description to `/api/foods/analyze`
   - Backend calls OpenAI GPT-4o with structured prompt
   - AI returns detailed nutritional breakdown
   - Results displayed in confirmation modal
   - User can add to daily log

2. **Data Persistence**:
   - All food entries saved to PostgreSQL database
   - Real-time updates using TanStack Query
   - Optimistic UI updates for smooth experience

3. **Macro Calculations**:
   - Protein: 4 calories per gram
   - Carbohydrates: 4 calories per gram
   - Fat: 9 calories per gram
   - Alcohol: 7 calories per gram
   - Percentages calculated based on total calorie content

## Mobile Experience

The app is designed mobile-first with:
- Touch-friendly button sizing (minimum 44px)
- Responsive grid layouts
- Sticky navigation elements
- Optimized for iOS and Android browsers
- PWA-ready architecture

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open a GitHub issue or contact the development team.
