# SmartClinic - Next.js Frontend

## 📋 Overview

Modern, responsive web frontend for the SmartClinic application, built with Next.js 14, React, TypeScript, and Tailwind CSS. Provides a user-friendly interface for clinic management.

## 🏗️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page (redirects to login)
│   ├── globals.css             # Global styles
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard page
│   ├── patients/
│   │   └── page.tsx            # Patient management
│   ├── prescriptions/
│   │   └── page.tsx            # Prescription management
│   └── medicines/
│       └── page.tsx            # Medicine database
├── components/                 # Reusable components
│   ├── Navbar.tsx
│   ├── PatientForm.tsx
│   └── ...
├── contexts/
│   └── AuthContext.tsx         # Authentication context
├── lib/
│   └── api.ts                  # API client and services
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend server running on `http://localhost:8080`

### Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 🎨 Features

### 1. Authentication
- Secure JWT-based authentication
- Login/logout functionality
- Protected routes
- Session persistence

### 2. Dashboard
- Overview statistics
- Quick action buttons
- Recent activity feed
- Responsive cards

### 3. Patient Management
- View all patients
- Search by name/phone
- Add new patient
- Edit patient details
- Delete patient
- View patient history

### 4. Prescription Management
- Create new prescription
- View prescription history
- Edit prescriptions
- Print prescription
- Patient visit records

### 5. Medicine Database
- Browse medicines
- Search medicines
- Add new medicine
- Edit medicine details
- Frequently used medicines
- Auto-suggestions based on usage

## 🎯 Pages

### Login Page (`/login`)
- Username/password authentication
- Error handling
- Remember credentials
- Responsive design

### Dashboard (`/dashboard`)
- Statistics cards
- Quick actions
- Recent activity
- Navigation menu

### Patients (`/patients`)
- Patient list with search
- Patient details view
- Add/Edit patient form
- Delete confirmation

### Prescriptions (`/prescriptions`)
- Prescription list
- Create prescription form
- Patient visit history
- Medicine selection
- Advice templates

### Medicines (`/medicines`)
- Medicine database
- Search functionality
- Add/Edit medicine
- Usage statistics

## 🔐 Authentication Flow

1. User enters credentials on login page
2. Frontend sends request to `/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Token included in all subsequent requests
6. Automatic redirect if token expires

## 📡 API Integration

### API Client (`lib/api.ts`)

```typescript
// Login
const response = await authApi.login(username, password);

// Get all patients
const patients = await patientApi.getAll();

// Create patient
const newPatient = await patientApi.create(patientData);

// Search medicines
const medicines = await medicineApi.search(query);
```

### Error Handling
- Automatic token refresh
- 401 redirect to login
- Toast notifications for errors
- Network error handling

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom color palette
- Responsive breakpoints
- Dark mode ready

### Custom Components
```css
.btn           /* Base button */
.btn-primary   /* Primary button */
.btn-secondary /* Secondary button */
.input         /* Form input */
.card          /* Card container */
```

## 🔧 Configuration

### Environment Variables

`.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Next.js Config (`next.config.js`)
```javascript
{
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:8080/api'
  }
}
```

### Tailwind Config (`tailwind.config.js`)
```javascript
{
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        danger: '#ef4444'
      }
    }
  }
}
```

## 📦 Building for Production

1. **Build the application**
```bash
npm run build
# or
yarn build
```

2. **Start production server**
```bash
npm start
# or
yarn start
```

3. **Static export (optional)**
```bash
npm run export
```

## 🐳 Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t smartclinic-frontend .
docker run -p 3000:3000 smartclinic-frontend
```

## 🧪 Testing

### Component Testing
```bash
npm test
```

### E2E Testing
```bash
npm run test:e2e
```

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All pages are fully responsive and mobile-friendly.

## 🎯 Key Components

### AuthContext
- Manages authentication state
- Provides login/logout functions
- Handles token storage
- Protected route wrapper

### API Client
- Centralized API calls
- Automatic token injection
- Error handling
- Response formatting

### Toast Notifications
- Success messages
- Error messages
- Info messages
- Custom styling

## 🔍 Common Tasks

### Add a New Page
1. Create folder in `/app`
2. Add `page.tsx` file
3. Implement component
4. Add route to navigation

### Add API Endpoint
1. Open `lib/api.ts`
2. Add function to appropriate API object
3. Use in component with async/await

### Style a Component
1. Use Tailwind utility classes
2. Custom CSS in `globals.css` if needed
3. Component-specific styles in module

## 🐛 Troubleshooting

### API Connection Issues
- Check backend is running
- Verify NEXT_PUBLIC_API_URL
- Check CORS settings on backend

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Token Issues
- Clear localStorage
- Login again
- Check token expiration time

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🎨 Screenshots

Login page, dashboard, patient management, prescription forms - all with modern, clean UI design.

## 👥 Development Team

Frontend interface for the SmartClinic backend API.

## 📄 License

MIT License
