# SmartClinic - Full Stack Application

## 📋 Project Overview

**SmartClinic** is a comprehensive clinic management system converted from a C# WPF desktop application to a modern web-based full-stack application. This project features a **Spring Boot backend** with RESTful APIs and a **Next.js frontend** with a responsive, user-friendly interface.

### Original Application
- **Platform**: C# .NET WPF Desktop Application
- **Database**: SQLite (local file-based)
- **Purpose**: Clinic management for individual doctors

### Converted Application
- **Backend**: Spring Boot 3.2 + Java 17
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Database**: SQLite (maintained for compatibility)
- **Architecture**: RESTful API + SPA (Single Page Application)

## 🎯 Key Features

### Patient Management
- ✅ Create, read, update, delete patient records
- ✅ Search patients by name or phone number
- ✅ Track patient visit history
- ✅ Store patient demographics (name, age, blood group, etc.)

### Prescription System
- ✅ Create detailed prescriptions
- ✅ Chief complaints and medical history
- ✅ Physical examination findings
- ✅ Investigations and lab tests
- ✅ Diagnosis and treatment plans
- ✅ Medicine prescriptions with dosages
- ✅ Medical advice and follow-up instructions

### Medicine Database
- ✅ Comprehensive medicine catalog
- ✅ Brand names, generic names, strengths
- ✅ Manufacturer information
- ✅ Medicine types (tablets, capsules, syrups, etc.)
- ✅ Usage frequency tracking
- ✅ Auto-suggestions based on usage patterns

### Template System
- ✅ Reusable templates for common scenarios
- ✅ Chief complaints library
- ✅ Diagnosis templates
- ✅ Treatment plan templates
- ✅ Medical advice templates
- ✅ Follow-up instructions

### Security & Authentication
- ✅ JWT-based authentication
- ✅ BCrypt password encryption
- ✅ Role-based access control (ready for expansion)
- ✅ Secure API endpoints
- ✅ Session management

### Doctor Profile
- ✅ Doctor information management
- ✅ Chamber details
- ✅ Visit schedule
- ✅ Contact information (multilingual support - English & Bangla)

## 🏗️ Project Structure

```
SmartClinic-main/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/smartclinic/
│   │   │   │   ├── entity/            # JPA Entities
│   │   │   │   ├── repository/        # Data Access Layer
│   │   │   │   ├── service/           # Business Logic
│   │   │   │   ├── controller/        # REST Controllers
│   │   │   │   ├── dto/               # Data Transfer Objects
│   │   │   │   ├── security/          # JWT & Security
│   │   │   │   └── config/            # Configuration
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                      # Unit Tests
│   ├── pom.xml                        # Maven Dependencies
│   └── README.md                      # Backend Documentation
│
├── frontend/                   # Next.js Frontend
│   ├── app/                           # Next.js App Router
│   │   ├── login/                     # Login Page
│   │   ├── dashboard/                 # Dashboard
│   │   ├── patients/                  # Patient Management
│   │   ├── prescriptions/             # Prescription System
│   │   └── medicines/                 # Medicine Database
│   ├── components/                    # React Components
│   ├── contexts/                      # React Context (Auth)
│   ├── lib/                           # API Client
│   ├── public/                        # Static Assets
│   ├── package.json                   # NPM Dependencies
│   ├── tsconfig.json                  # TypeScript Config
│   ├── tailwind.config.js             # Tailwind Config
│   └── README.md                      # Frontend Documentation
│
├── SmartClinic-main/          # Original C# Application (reference)
│   └── SmartClinic/
│       ├── *.cs                       # C# Source Files
│       └── *.xaml                     # WPF UI Files
│
└── README.md                   # This file
```

## 🚀 Quick Start Guide

### Prerequisites

**Backend:**
- Java 17 or higher
- Maven 3.6+

**Frontend:**
- Node.js 18+
- npm or yarn

### Step 1: Start the Backend

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend will start on `http://localhost:8080/api`

### Step 2: Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will start on `http://localhost:3000`

### Step 3: Login

Open browser and navigate to `http://localhost:3000`

**Default Credentials:**
- Username: `AbuNoyim`
- Password: `12345678`

## 📊 Database Schema

### Core Tables

1. **Users** - System authentication
2. **Patient** - Patient demographics
3. **PatientVisit** - Prescription records
4. **Medicine** - Medicine catalog
5. **MedicineGroup** - Medicine groupings

### Template Tables (Auto-suggestions)

6. **Advices** - Medical advice templates
7. **FollowUp** - Follow-up instructions
8. **SpecialNotes** - Special notes
9. **ChiefComplaint** - Common complaints
10. **History** - Medical history templates
11. **OnExamination** - Examination findings
12. **Investigation** - Lab test templates
13. **Diagnosis** - Diagnosis templates
14. **TreatmentPlan** - Treatment templates

### Configuration Tables

15. **DoctorInformation** - Doctor profile
16. **Questions** - Security questions

## 🔌 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | Register new user |
| POST | `/auth/logout/{username}` | Logout user |

### Patient Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/patients` | Get all patients |
| GET | `/patients/{id}` | Get patient by ID |
| POST | `/patients` | Create patient |
| PUT | `/patients/{id}` | Update patient |
| DELETE | `/patients/{id}` | Delete patient |
| GET | `/patients/search?name=xyz` | Search by name |

### Prescription Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/prescriptions` | Get all prescriptions |
| POST | `/prescriptions` | Create prescription |
| GET | `/prescriptions/patient/{id}` | Get patient history |

### Medicine Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/medicines` | Get all medicines |
| POST | `/medicines` | Create medicine |
| GET | `/medicines/search?q=xyz` | Search medicines |
| GET | `/medicines/top` | Most used medicines |

## 🔐 Security Implementation

### Backend Security
- **Spring Security** with JWT authentication
- **BCrypt** password hashing
- Token-based stateless authentication
- CORS configuration for frontend communication
- Protected API endpoints

### Frontend Security
- JWT token storage in localStorage
- Automatic token injection in API requests
- Token expiration handling
- Protected routes with authentication check
- Automatic redirect to login on 401

## 🎨 Frontend Features

### Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, mobile
- **Tailwind CSS** - Modern, utility-first styling
- **Lucide Icons** - Beautiful icon library
- **Toast Notifications** - User feedback for actions
- **Loading States** - Better user experience
- **Form Validation** - Client-side validation

### Pages
1. **Login** - Secure authentication
2. **Dashboard** - Overview and quick actions
3. **Patients** - Patient management
4. **Prescriptions** - Create and manage prescriptions
5. **Medicines** - Medicine database

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual API Testing

Use cURL or Postman:

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"AbuNoyim","password":"12345678"}'

# Get patients (with token)
curl -X GET http://localhost:8080/api/patients \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📦 Production Deployment

### Backend Deployment

1. **Build JAR file:**
```bash
cd backend
mvn clean package -DskipTests
```

2. **Run JAR:**
```bash
java -jar target/smartclinic-backend-1.0.0.jar
```

### Frontend Deployment

1. **Build for production:**
```bash
cd frontend
npm run build
```

2. **Start production server:**
```bash
npm start
```

### Docker Deployment

**Backend Dockerfile:**
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/smartclinic-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - JWT_SECRET=your-secret-key
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8080/api
```

## 🔄 Migration from Original Application

### What Changed?

| Aspect | Original (C#) | New (Java/TS) |
|--------|---------------|---------------|
| Backend | C# .NET | Spring Boot (Java) |
| Frontend | WPF (XAML) | Next.js (React/TypeScript) |
| Architecture | Desktop App | Web-based REST API + SPA |
| Database Access | ADO.NET | JPA/Hibernate |
| UI Framework | WPF | React + Tailwind CSS |
| Security | Basic auth | JWT + Spring Security |
| Deployment | Windows installer | Docker/JAR/npm |

### What Remained?

- ✅ SQLite database schema
- ✅ Core business logic
- ✅ Data models and relationships
- ✅ Feature parity

## 🛠️ Development Workflow

1. **Backend Development**
   - Create entity classes
   - Define repositories
   - Implement services
   - Create REST controllers
   - Test with Postman/cURL

2. **Frontend Development**
   - Create page components
   - Implement API calls
   - Add styling with Tailwind
   - Handle state management
   - Test in browser

3. **Integration**
   - Connect frontend to backend APIs
   - Handle authentication flow
   - Test end-to-end functionality

## 📝 Environment Configuration

### Backend (application.properties)
```properties
server.port=8080
spring.datasource.url=jdbc:sqlite:smartclinic.db
jwt.secret=your-secret-key
jwt.expiration=86400000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 🐛 Troubleshooting

### Backend Issues
- **Port in use**: Change `server.port` in application.properties
- **Database locked**: Close any SQLite connections
- **JWT errors**: Check secret key configuration

### Frontend Issues
- **API connection failed**: Verify backend is running
- **CORS errors**: Check backend CORS configuration
- **Module not found**: Run `npm install`

### Common Solutions
```bash
# Clear backend build
cd backend
mvn clean

# Clear frontend cache
cd frontend
rm -rf .next node_modules
npm install
```

## 📚 Learning Resources

### Spring Boot
- [Official Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JPA Guide](https://spring.io/guides/gs/accessing-data-jpa/)

### Next.js & React
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🎯 Future Enhancements

- [ ] Role-based access control (Admin, Doctor, Receptionist)
- [ ] Appointment scheduling system
- [ ] SMS/Email notifications
- [ ] Prescription PDF generation
- [ ] Report generation and analytics
- [ ] Multi-doctor support
- [ ] Inventory management
- [ ] Billing system
- [ ] Cloud database integration
- [ ] Mobile app (React Native)

## 👥 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Check documentation in `/backend/README.md` and `/frontend/README.md`

## 🙏 Acknowledgments

- Original SmartClinic WPF application developers
- Spring Boot community
- Next.js team
- Open-source contributors

---

**Built with ❤️ for modern healthcare management**
