# Restaurant Landing Page Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/restaurant?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace the MONGODB_URI in your backend `.env` file

### 4. Run the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

**Terminal 3 (Seed Database - Optional):**
```bash
cd backend
node seedData.js
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Features Included

✅ Modern responsive design
✅ Hero section with animations
✅ Special offers section
✅ Featured meals with filtering
✅ About section with restaurant info
✅ Contact form with reservation
✅ Footer with social links
✅ MongoDB Atlas integration
✅ Sample data seeding
✅ API endpoints for all features

## Next Steps

1. Replace sample images with your restaurant photos
2. Update restaurant information in the seed data
3. Customize colors and branding
4. Add more meal categories
5. Implement user authentication (optional)
6. Add payment integration (optional)

## Troubleshooting

- Make sure MongoDB Atlas allows connections from your IP
- Check that all environment variables are set correctly
- Ensure both servers are running on different ports
- Check browser console for any API connection errors

