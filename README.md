# Smart Job Tracker Dashboard

A modern, production-ready full-stack job tracking application built with React, Node.js, and MongoDB.

## 📋 Features

### Core Features
- **Job Application CRUD**: Add, edit, delete, and bookmark job applications
- **Application Status Pipeline**: Track applications through different stages (Applied, Interview Scheduled, Offer Received, Rejected)
- **Smart Search**: Search by company name or role with debounced input
- **Advanced Filtering**: Filter by status, platform, and location
- **Sorting Options**: Sort by applied date, salary, or company name
- **Dashboard Analytics**: View comprehensive statistics and charts
- **Bookmark Feature**: Save important applications for quick access

### UI/UX Features
- **Modern SaaS-style Design**: Clean, minimalist interface inspired by Notion, Linear, and Stripe
- **Responsive Layout**: Fully responsive design for all devices
- **Smooth Animations**: Framer Motion for elegant transitions
- **Loading States**: Skeleton loaders for better UX
- **Empty States**: User-friendly empty state designs
- **Toast Notifications**: Real-time feedback for user actions
- **Dark/Light Mode Ready**: Extensible color system

### Advanced Features
- **Context API State Management**: Global state for applications
- **Custom Hooks**: useApplications, useDebounce, useLocalStorage
- **Form Validation**: React Hook Form + Yup validation
- **Charts & Analytics**: Recharts for data visualization
- **Toast Notifications**: React Toastify for alerts
- **REST API**: Fully functional backend API

## 🛠 Tech Stack

### Frontend
- React 18.2
- Vite
- React Router DOM
- Context API
- Axios
- React Hook Form + Yup
- Recharts
- Framer Motion
- React Toastify
- Tailwind CSS
- React Icons



## 📁 Project Structure

```
job-tracker-project/
├── client/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Context API setup
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── server/
│   ├── controllers/          # API controllers
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── config/               # Database config
│   ├── app.js                # Express app
│   ├── package.json
│   └── .env.example
│
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd job-tracker-project
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and configuration
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📝 API Endpoints

All endpoints are prefixed with `/api/jobs`

### Jobs
- `GET /` - Get all jobs (supports filters: status, platform, location, search, sortBy)
- `GET /analytics` - Get analytics data
- `GET /:id` - Get a single job
- `POST /` - Create a new job
- `PUT /:id` - Update a job
- `DELETE /:id` - Delete a job
- `PATCH /:id/bookmark` - Toggle bookmark status

## 🎨 Design System

### Colors
- **Primary**: Indigo (#4f46e5)
- **Secondary**: Purple (#a855f7)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Background**: Light Gray (#f9fafb)

### Components
- Navbar
- Sidebar (collapsible)
- StatsCard
- JobCard
- SearchBar
- FiltersPanel
- Modal
- DeleteConfirmation
- ApplicationForm
- SkeletonLoader
- EmptyState

## 📊 Pages

### Dashboard
- Overview statistics
- Application status pie chart
- Monthly applications line chart
- Recent applications list

### Applications
- Table/Grid view toggle
- Advanced search with debounce
- Status, platform, location filters
- Sorting options
- Bookmark feature
- Add/Edit/Delete applications

### Analytics
- Success rate calculation
- Interview conversion rate
- Monthly trends
- Status distribution
- Bar and pie charts
- Detailed insights

### Add/Edit Application
- Form with validation
- Date picker inputs
- Status selection
- Notes field
- Pre-filled edit mode

## 🔄 State Management

The app uses Context API with a custom reducer pattern for state management:

```javascript
- applications: Array of job applications
- loading: Loading state
- filters: Current filter values
- searchQuery: Current search input
- sortBy: Current sort option
```

## 🎯 Custom Hooks

### useApplications
Handles all API calls for CRUD operations and analytics

### useDebounce
Debounces search input for optimized API calls

### useLocalStorage
Persists data to browser localStorage

## 🧪 Testing

The application includes:
- Form validation with React Hook Form
- Error handling on API calls
- Loading and empty states
- Confirmation modals for destructive actions

## 📦 Build & Deployment

### Frontend
```bash
cd client
npm run build
# Produces optimized build in dist/
```

### Backend
```bash
# Set NODE_ENV=production in .env
# Deploy using your preferred service (Heroku, Railway, etc.)
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-tracker
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend
Uses Vite's `.env` files for environment-specific configurations

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org)

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

---

Built with ❤️ by developers for developers.
