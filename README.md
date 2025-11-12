# 🏥 SmartPrescription - Modern Clinic Management System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

A comprehensive digital solution for prescription management, patient records, and clinic operations. Built with modern technologies to streamline medical practice workflows and enhance patient care.

![SmartPrescription Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=SmartPrescription+-+Modern+Clinic+Management)

## 🎥 Demo Video

### Watch SmartPrescription in Action

[![SmartPrescription Demo](https://img.youtube.com/vi/kcfUuJgYQJo/maxresdefault.jpg)](https://www.youtube.com/watch?v=kcfUuJgYQJo)

**What you'll see in the demo:**
- 👨‍⚕️ Complete prescription workflow from patient registration to print
- 📝 Digital prescription creation with medicine search
- 📊 Analytics dashboard and reports
- 👥 Patient management system
- 🔐 Secure authentication and user management

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation Guide](#-installation-guide)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
  - [Swagger UI Guide](SWAGGER_GUIDE.md)
- [User Guide](#-user-guide)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 📝 Prescription Management
- **Digital Prescription Creation**: Create professional prescriptions with ease
- **Template System**: Pre-defined templates for faster prescription writing
- **Bilingual Support**: Full support for English and Bangla languages
- **Print-Ready Format**: Generate print-optimized prescription layouts
- **Edit & Update**: Modify existing prescriptions seamlessly
- **Prescription History**: Track all prescriptions with date-wise records

### 👥 Patient Management
- **Patient Profiles**: Comprehensive patient information management
- **Medical History**: Track patient history, complaints, and diagnoses
- **Age & Gender Tracking**: Complete demographic information
- **Search & Filter**: Quick patient lookup by name or ID
- **Patient Dashboard**: View all patient interactions in one place

### 💊 Medicine Management
- **Medicine Database**: Extensive searchable medicine library
- **Smart Auto-Complete**: Intelligent medicine name suggestions
- **Dosage Information**: Schedule, duration, and timing details
- **Custom Notes**: Add specific instructions for each medicine

### 📊 Analytics & Reports
- **Day-wise Reports**: Track daily prescription counts
- **Visual Analytics**: Interactive charts and graphs
- **Date Range Filters**: Analyze data for specific time periods
- **Performance Metrics**: Monitor clinic productivity

### 🔐 Security & Privacy
- **User Authentication**: Secure login with JWT tokens
- **Role-Based Access**: Individual doctor workspaces
- **Data Isolation**: Each doctor's data is completely separate
- **Secure Storage**: Encrypted data transmission

### 🎨 User Experience
- **Modern UI/UX**: Clean, intuitive interface design
- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode Support**: Comfortable viewing in any lighting
- **Fast Performance**: Optimized for speed and efficiency

## 🏗️ Architecture

SmartPrescription follows a **Clean Architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Presentation Layer (React Components)                │  │
│  │  - Pages, Components, Contexts                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓↑ REST API                         │
└─────────────────────────────────────────────────────────────┘
                              ↓↑
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Spring Boot)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controller Layer (REST Controllers)                  │  │
│  │  - API Endpoints, Request/Response Handling           │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓↑                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Service Layer (Business Logic)                       │  │
│  │  - Use Cases, Domain Logic                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓↑                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Repository Layer (Data Access)                       │  │
│  │  - JPA Repositories, Database Operations              │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓↑                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Domain Layer (Entities & Models)                     │  │
│  │  - Business Entities, Domain Models                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓↑
┌─────────────────────────────────────────────────────────────┐
│                    Database (SQLite)                         │
│  - Prescriptions, Patients, Medicines, Users                │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Principles

1. **Separation of Concerns**: Each layer has distinct responsibilities
2. **Dependency Inversion**: High-level modules don't depend on low-level modules
3. **Single Responsibility**: Each component has one reason to change
4. **DRY (Don't Repeat Yourself)**: Reusable components and utilities
5. **SOLID Principles**: Applied throughout the codebase

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (React 18)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: Native JavaScript Date API

### Backend
- **Framework**: [Spring Boot 3.3.5](https://spring.io/projects/spring-boot)
- **Language**: Java 17
- **Security**: Spring Security with JWT
- **Database**: SQLite with JPA/Hibernate
- **Build Tool**: Maven 3.9
- **API Style**: RESTful APIs
- **Validation**: Spring Validation

### Development Tools
- **Version Control**: Git
- **Code Editor**: VS Code (recommended)
- **Package Managers**: npm (frontend), Maven (backend)
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest versions)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Java JDK**: 17 or higher ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Maven**: 3.9.0 or higher ([Download](https://maven.apache.org/download.cgi))
- **Git**: Latest version ([Download](https://git-scm.com/downloads))

### Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Java version
java -version

# Check Maven version
mvn -version

# Check Git version
git --version
```

## 🚀 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/BadhonAhmad/SmartPrescription.git
cd SmartPrescription
```

### 2. Backend Setup (Spring Boot)

#### Step 1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2: Configure Database (Optional)
The application uses SQLite by default. Configuration is in `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:sqlite:smartprescription.db
spring.datasource.driver-class-name=org.sqlite.JDBC
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# Server Configuration
server.port=8080
```

#### Step 3: Build the Project
```bash
mvn clean install
```

#### Step 4: Run the Backend
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

#### Alternative: Run with JAR
```bash
# Build JAR
mvn clean package

# Run JAR
java -jar target/smartprescription-backend-1.0.0.jar
```

### 3. Frontend Setup (Next.js)

#### Step 1: Navigate to Frontend Directory
```bash
# From root directory
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Configure API Endpoint
Update the API base URL in `lib/api.ts` if needed:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
```

#### Step 4: Run Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`


### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Swagger API Documentation**: http://localhost:8080/api/swagger-ui.html
- **OpenAPI Spec**: http://localhost:8080/api/v3/api-docs

### 5. Explore the API with Swagger

Swagger UI provides an interactive API documentation where you can:
- View all available endpoints
- Test API calls directly from the browser
- See request/response schemas
- Authenticate with JWT tokens

**To use authenticated endpoints:**
1. Go to http://localhost:8080/api/swagger-ui.html
2. Click on the "Authorize" button (lock icon)
3. Enter your JWT token in format: `Bearer your-jwt-token`
4. Click "Authorize"
5. Now you can test protected endpoints

### 6. Create Your First Account

1. Click on **"Get Started"** or **"Sign Up"**
2. Fill in your registration details
3. Complete your doctor profile
4. Start creating prescriptions!

## 📁 Project Structure

```
SmartPrescription/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/smartprescription/
│   │   │   │   ├── application/      # Application Layer
│   │   │   │   │   ├── port/         # Interfaces/Ports
│   │   │   │   │   └── usecase/      # Use Cases
│   │   │   │   ├── config/           # Configuration Classes
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   ├── controller/       # REST Controllers
│   │   │   │   │   ├── ApiV1PrescriptionController.java
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── MedicineController.java
│   │   │   │   │   └── PatientController.java
│   │   │   │   ├── domain/           # Domain Layer
│   │   │   │   │   ├── model/        # Domain Models
│   │   │   │   │   └── repository/   # Repository Interfaces
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── entity/           # JPA Entities
│   │   │   │   ├── infrastructure/   # Infrastructure Layer
│   │   │   │   │   ├── persistence/  # Database Implementation
│   │   │   │   │   └── web/          # Web Infrastructure
│   │   │   │   ├── repository/       # JPA Repositories
│   │   │   │   ├── security/         # Security Components
│   │   │   │   ├── service/          # Service Layer
│   │   │   │   └── SmartPrescriptionApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                     # Test Files
│   ├── pom.xml                       # Maven Dependencies
│   └── README.md
│
├── frontend/                         # Next.js Frontend
│   ├── app/                          # App Directory (Next.js 14)
│   │   ├── dashboard/               # Dashboard Page
│   │   │   └── page.tsx
│   │   ├── login/                   # Login Page
│   │   │   └── page.tsx
│   │   ├── signup/                  # Signup Page
│   │   │   └── page.tsx
│   │   ├── prescriptions/           # Prescription Pages
│   │   │   ├── page.tsx            # List View
│   │   │   ├── create/             # Create New
│   │   │   ├── edit/[id]/          # Edit Existing
│   │   │   ├── view/[id]/          # View/Print
│   │   │   └── report/             # Analytics
│   │   ├── patients/                # Patient Management
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   ├── medicines/               # Medicine Management
│   │   │   ├── page.tsx
│   │   │   └── new/
│   │   ├── profile/                 # Doctor Profile
│   │   │   └── settings/
│   │   ├── layout.tsx               # Root Layout
│   │   ├── page.tsx                 # Landing Page
│   │   ├── globals.css              # Global Styles
│   │   └── providers.tsx            # Context Providers
│   ├── components/                  # Reusable Components
│   │   ├── ProfileDropdown.tsx
│   │   ├── MedicineSearchModal.tsx
│   │   ├── DiagnosisAutoComplete.tsx
│   │   ├── ChiefComplaintModal.tsx
│   │   ├── HistoryModal.tsx
│   │   ├── AdviceModal.tsx
│   │   └── InvestigationModal.tsx
│   ├── contexts/                    # React Contexts
│   │   └── AuthContext.tsx
│   ├── lib/                         # Utility Libraries
│   │   ├── api.ts                  # API Client
│   │   └── profileUtils.ts         # Profile Utilities
│   ├── public/                      # Static Assets
│   ├── package.json                 # Dependencies
│   ├── tsconfig.json                # TypeScript Config
│   ├── tailwind.config.js           # Tailwind Config
│   └── next.config.js               # Next.js Config
│
├── INSTALLATION_GUIDE.md            # Detailed Installation Guide
├── CLEAN_ARCHITECTURE_SUMMARY.md    # Architecture Documentation
├── README.md                         # This File
└── .gitignore                       # Git Ignore Rules
```

## 📡 API Documentation

### Swagger UI (Interactive Documentation)

Access the interactive API documentation at:
**http://localhost:8080/api/swagger-ui.html**

Swagger UI provides:
- ✅ Complete list of all endpoints
- ✅ Request/Response schemas
- ✅ Try-it-out functionality
- ✅ Authentication support
- ✅ Example requests and responses

### API Endpoints Overview

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "doctor123",
  "password": "securePassword123",
  "email": "doctor@example.com"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "doctor123",
  "password": "securePassword123"
}
```

### Prescription Endpoints

#### Get All Prescriptions
```http
GET /API/v1/prescription
Authorization: Bearer {token}
```

#### Create Prescription
```http
POST /API/v1/prescription
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "patientAge": 45,
  "gender": "M",
  "visit": "2025-11-11",
  "diagnosis": "Common Cold",
  "medicine": "Paracetamol 500mg - 1+1+1 - 5 days",
  "advice": "Rest and drink plenty of fluids"
}
```

#### Get Prescription by ID
```http
GET /API/v1/prescription/{id}
Authorization: Bearer {token}
```

#### Update Prescription
```http
PUT /API/v1/prescription/{id}
Authorization: Bearer {token}
Content-Type: application/json
```

#### Delete Prescription
```http
DELETE /API/v1/prescription/{id}
Authorization: Bearer {token}
```

#### Day-wise Report
```http
GET /API/v1/prescription/report/daywise
Authorization: Bearer {token}
```

### Patient Endpoints

#### Get All Patients
```http
GET /API/v1/patient
Authorization: Bearer {token}
```

#### Create Patient
```http
POST /API/v1/patient
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Smith",
  "age": 32,
  "gender": "F",
  "phone": "01712345678",
  "address": "Dhaka, Bangladesh"
}
```

### Medicine Endpoints

#### Search Medicines
```http
GET /API/v1/medicine/search?q={searchTerm}
Authorization: Bearer {token}
```

## 📖 User Guide

### Getting Started

#### 1. First Time Setup
1. **Register Account**: Create your doctor account
2. **Complete Profile**: Fill in your professional details
3. **Set Up Chamber Info**: Add your clinic information
4. **Customize Settings**: Adjust prescription layout preferences

#### 2. Creating Your First Prescription
1. Click **"New Prescription"** from dashboard
2. Enter patient information
3. Add chief complaints
4. Record examination findings
5. Add diagnosis
6. Select medicines with dosage
7. Add investigations if needed
8. Write advice
9. Set follow-up date
10. Save and Print

#### 3. Managing Patients
- Add new patients with complete information
- View patient history
- Search patients by name
- Edit patient details
- Track all prescriptions for a patient

#### 4. Using Analytics
- View day-wise prescription counts
- Filter by date range
- Track your practice growth
- Export reports

### Tips & Best Practices

✅ **DO:**
- Complete your profile before creating prescriptions
- Use medicine search for accurate spelling
- Add detailed diagnosis information
- Set follow-up dates for chronic conditions
- Review prescriptions before printing

❌ **DON'T:**
- Share your login credentials
- Leave patient information incomplete
- Skip important medical history
- Forget to save before closing

## 🔧 Configuration

### Environment Variables

#### Backend (.env or application.properties)
```properties
# Server Configuration
server.port=8080

# Database
spring.datasource.url=jdbc:sqlite:smartprescription.db

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# CORS
cors.allowed-origins=http://localhost:3000
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=SmartPrescription
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Follow Java and TypeScript best practices
- Use meaningful variable and function names
- Write clear comments for complex logic
- Ensure all tests pass before submitting

## 🐛 Troubleshooting

### Common Issues

#### Issue: Backend Won't Start
**Solution:**
- Check Java version: `java -version`
- Verify Maven installation: `mvn -version`
- Check port 8080 is not in use
- Review application.properties configuration

#### Issue: Frontend Build Fails
**Solution:**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall dependencies: `npm install`
- Check Node.js version: `node --version`

#### Issue: Database Connection Error
**Solution:**
- Ensure SQLite database file exists
- Check file permissions
- Verify datasource URL in application.properties

#### Issue: API Calls Failing
**Solution:**
- Verify backend is running on port 8080
- Check CORS configuration
- Ensure authentication token is valid
- Review browser console for errors

## 📞 Support

For support, please:
- 📧 Email: support@smartprescription.com
- 🐛 Report Issues: [GitHub Issues](https://github.com/BadhonAhmad/SmartPrescription/issues)
- 📖 Documentation: [Wiki](https://github.com/BadhonAhmad/SmartPrescription/wiki)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for medical professionals
- Special thanks to all contributors
- Icons by [Lucide](https://lucide.dev/)
- UI Framework by [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ by [Badhon Ahmad](https://github.com/BadhonAhmad)**

⭐ Star this repository if you find it helpful!
