# Messenger — Backend

Real-time messenger backend built with Node.js, Express, MongoDB, and Socket.io.

## Tech Stack

- **Node.js** + **Express** — REST API
- **TypeScript** — Type safety
- **MongoDB** + **Mongoose** — Database
- **Socket.io** — Real-time messaging
- **Passport.js** + **JWT** — Authentication
- **Cloudinary** — File uploads
- **Zod** — Schema validation

## Features

- JWT authentication with secure cookies
- Real-time one-on-one and group chat
- Built-in AI assistant
- Online/offline user presence
- File uploads
- Message reply support

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
git https://github.com/ryadevx/chat-app.git
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `/backend` folder:

```env
NODE_ENV=development
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
FRONTEND_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ANTHROPIC_API_KEY=your_api_key
```

### Run

```bash
# Development
npm run dev

# Production
npm run build
npm start
```
