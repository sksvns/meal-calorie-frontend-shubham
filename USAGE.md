# Meal Calorie Tracker - Quick Start Guide

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🎯 Features Overview

### Authentication
- **Register**: Create a new account with first name, last name, email, and password
- **Login**: Sign in with email and password
- **Logout**: Secure logout with session cleanup

### Calorie Lookup
- **Search**: Enter dish name and number of servings
- **Results**: View calories per serving, total calories, and data source
- **History**: Track previous searches with ability to clear history

### UI Features
- **Dark/Light Mode**: Toggle between themes using the header button
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success and error alerts

## 📋 API Requirements

The frontend expects the backend to be running on `http://localhost:3000` with the following endpoints:

### Authentication Endpoints
```bash
POST /api/auth/register
Content-Type: application/json
{
  "first_name": "John",
  "last_name": "Doe", 
  "email": "john@example.com",
  "password": "password123"
}

POST /api/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Calorie Lookup Endpoint
```bash
POST /api/food/get-calories
x-auth-token: <JWT_TOKEN>
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
{
  "dish_name": "paneer tikka",
  "servings": 2
}
```

## 🎨 Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern UI components
- **Zustand** - Lightweight state management
- **React Hook Form + Zod** - Form handling and validation
- **Sonner** - Toast notifications
- **Lucide React** - Beautiful icons

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📱 Mobile-First Design

The application is built with a mobile-first approach and includes:
- Responsive navigation header
- Flexible form layouts
- Touch-friendly interface elements
- Optimized for all screen sizes

## 🌙 Theme Support

Automatic theme detection with manual toggle support:
- System theme detection
- Light mode with clean, professional styling
- Dark mode with comfortable contrast
- Persistent theme selection

## 🔒 Security Features

- JWT token storage with automatic cleanup
- Form validation with Zod schemas
- API error handling with user feedback
- Secure authentication flow

## 🚦 Usage Flow

1. **First Visit**: Registration form with validation
2. **Authentication**: Login with email/password
3. **Dashboard**: Main interface with calorie lookup form
4. **Search**: Enter dish details and get results
5. **History**: View previous searches with clear option
6. **Theme**: Toggle between light/dark modes
7. **Logout**: Secure session termination

## 📝 Notes

- The frontend runs on port 3001 (3000 is used by backend)
- All API calls include proper error handling
- State is persisted in localStorage for authentication
- Form validation provides real-time feedback
- The application works offline for cached data
