# Authentication React App

A modern React application built with Material-UI that provides user authentication features including login, signup, and a dashboard interface. This application works in conjunction with a Ruby on Rails backend API.

## Features

- User authentication (Login/Signup)
- Protected routes
- Material-UI components
- Responsive design
- JWT token handling
- Dashboard interface

## Tech Stack

- React 18
- React Router v6
- Material-UI (MUI) v5
- Axios for API requests
- Local Storage for token management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running (Rails API)

## Installation

1. Clone the repository:
```bash
git clone git@github.com:mitdonga/ds-assignment-fe.git
cd ds-assignment-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a .env file in the root directory:
```env
VITE_APP_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`


## API Integration

The application communicates with a Rails backend API. Configure the API URL in the `.env` file:

```env
VITE_APP_API_URL=http://localhost:3000
```

Available API endpoints:
- POST /login - User login
- POST /signup - User registration
- DELETE /logout - User logout
- GET /dashboard - Dashboard data
- GET /members - List members
- POST /members/invite - Invite new member

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_APP_API_URL | Backend API URL | http://localhost:3000 |

## Development

1. Start the development server:
```bash
npm start
```

2. Build for production:
```bash
npm run build
```