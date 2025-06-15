# Meal Calorie Tracker Frontend

A modern, responsive React application built with Next.js for tracking calories in meals. Features user authentication, real-time calorie lookup, and a beautiful dark/light mode interface.

## Features

- 🔐 **User Authentication** - Register and login functionality
- 🔍 **Calorie Lookup** - Search for dishes and get detailed calorie information
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🌙 **Dark/Light Mode** - Seamless theme switching
- 📊 **Results History** - Track your previous searches
- ⚡ **Real-time Feedback** - Loading states and toast notifications
- 🎨 **Modern UI** - Built with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:3000`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.local.example .env.local
   ```

4. Configure your API URL in `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3001](http://localhost:3001) in your browser

## API Integration

The application integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Calorie Lookup
- `POST /api/food/get-calories` - Get calorie information for dishes

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── auth-page.tsx  # Authentication page
│   ├── dashboard.tsx  # Main dashboard
│   └── ...
├── lib/               # Utility functions
│   ├── api.ts         # API client
│   ├── utils.ts       # General utilities
│   └── validations.ts # Zod schemas
└── store/             # Zustand store
    └── index.ts       # Global state management
```

## Key Features

### Authentication
- User registration with form validation
- Secure login with JWT token storage
- Persistent authentication state
- Automatic logout functionality

### Calorie Lookup
- Real-time dish search
- Detailed nutritional information
- Serving size calculations
- Search history tracking

### User Experience
- Loading states for all async operations
- Error handling with user-friendly messages
- Responsive design for all screen sizes
- Accessibility-compliant components

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
