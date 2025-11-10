# SmartClinic - Spring Boot Backend

## 📋 Overview

This is the Spring Boot backend for the SmartClinic application, converted from the original C# WPF desktop application. It provides RESTful APIs for clinic management, including patient records, prescriptions, medicine database, and authentication.

## 🏗️ Architecture

### Technology Stack
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: SQLite 3.44.1
- **Security**: Spring Security + JWT
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven

### Project Structure
```
backend/
├── src/main/java/com/smartclinic/
│   ├── SmartClinicApplication.java
│   ├── entity/                    # JPA Entities
│   │   ├── User.java
│   │   ├── Patient.java
│   │   ├── PatientVisit.java
│   │   ├── Medicine.java
│   │   └── ...
│   ├── repository/                # Spring Data Repositories
│   │   ├── UserRepository.java
│   │   ├── PatientRepository.java
│   │   └── ...
│   ├── service/                   # Business Logic
│   │   ├── AuthService.java
│   │   ├── PatientService.java
│   │   └── ...
│   ├── controller/                # REST Controllers
│   │   ├── AuthController.java
│   │   ├── PatientController.java
│   │   └── ...
│   ├── dto/                       # Data Transfer Objects
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   └── ApiResponse.java
│   ├── security/                  # Security Configuration
│   │   ├── JwtUtil.java
│   │   └── JwtAuthenticationFilter.java
│   └── config/                    # Application Configuration
│       └── SecurityConfig.java
└── src/main/resources/
    └── application.properties
```

## 📊 Database Schema

### Tables

1. **Users** - System users (doctors/admins)
   - id, username, password, status

2. **Patient** - Patient information
   - id, name, age, address, phone, blood, lastVisit

3. **PatientVisit** - Prescription records
   - prescriptionId, id (patient), visit, medicine, advice, followUp, notes, complaint, history, onExamination, investigation, diagnosis, treatmentPlan

4. **Medicine** - Medicine database
   - id, manufacturerName, brandName, genericName, strength, medicineType, occurrence, dosageDescription

5. **Template Tables** (for auto-suggestions)
   - Advices, FollowUp, SpecialNotes
   - ChiefComplaint, History, OnExamination
   - Investigation, Diagnosis, TreatmentPlan
   - MedicineGroup

6. **DoctorInformation** - Doctor profile
7. **Questions** - Security questions

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- SQLite (included in dependencies)

### Installation

1. **Clone the repository**
```bash
cd backend
```

2. **Configure application.properties** (optional)
```properties
# Backend runs on port 8080 by default
server.port=8080
server.servlet.context-path=/api

# Database file will be created automatically
spring.datasource.url=jdbc:sqlite:smartclinic.db

# JWT configuration
jwt.secret=your-secret-key
jwt.expiration=86400000
```

3. **Build the project**
```bash
mvn clean install
```

4. **Run the application**
```bash
mvn spring-boot:run
```

Or run the JAR file:
```bash
java -jar target/smartclinic-backend-1.0.0.jar
```

5. **Access the API**
- Base URL: `http://localhost:8080/api`
- Health check: `http://localhost:8080/api/auth/login` (POST)

## 📡 API Endpoints

### Authentication
```
POST /auth/login      - User login
POST /auth/register   - Register new user
POST /auth/logout/{username} - Logout user
```

### Patient Management
```
GET    /patients           - Get all patients
GET    /patients/{id}      - Get patient by ID
POST   /patients           - Create new patient
PUT    /patients/{id}      - Update patient
DELETE /patients/{id}      - Delete patient
GET    /patients/search?name=xyz - Search by name
GET    /patients/search?phone=123 - Search by phone
```

### Prescription Management
```
GET    /prescriptions                  - Get all prescriptions
GET    /prescriptions/{id}             - Get prescription by ID
POST   /prescriptions                  - Create new prescription
PUT    /prescriptions/{id}             - Update prescription
DELETE /prescriptions/{id}             - Delete prescription
GET    /prescriptions/patient/{id}     - Get patient history
GET    /prescriptions/search?name=xyz  - Search prescriptions
```

### Medicine Management
```
GET    /medicines         - Get all medicines
GET    /medicines/{id}    - Get medicine by ID
POST   /medicines         - Create new medicine
PUT    /medicines/{id}    - Update medicine
DELETE /medicines/{id}    - Delete medicine
GET    /medicines/search?q=xyz - Search medicines
GET    /medicines/top     - Get frequently used medicines
POST   /medicines/{id}/increment - Increment usage count
```

## 🔐 Security

### JWT Authentication

1. **Login** to get JWT token:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "AbuNoyim", "password": "12345678"}'
```

Response:
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "AbuNoyim",
    "message": "Login successful"
  }
}
```

2. **Use token** in subsequent requests:
```bash
curl -X GET http://localhost:8080/api/patients \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Password Security
- Passwords are encrypted using BCrypt
- Default user credentials:
  - Username: `AbuNoyim`
  - Password: `12345678`

## 🧪 Testing

### Manual Testing with cURL

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"AbuNoyim","password":"12345678"}'
```

**Create Patient:**
```bash
curl -X POST http://localhost:8080/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": "35",
    "phone": "01712345678",
    "address": "Dhaka, Bangladesh",
    "blood": "B+"
  }'
```

**Get All Patients:**
```bash
curl -X GET http://localhost:8080/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Unit Tests
```bash
mvn test
```

## 📦 Building for Production

1. **Build JAR file:**
```bash
mvn clean package -DskipTests
```

2. **Run in production:**
```bash
java -jar target/smartclinic-backend-1.0.0.jar
```

3. **With custom profile:**
```bash
java -jar target/smartclinic-backend-1.0.0.jar --spring.profiles.active=prod
```

## 🐳 Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/smartclinic-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

Build and run:
```bash
docker build -t smartclinic-backend .
docker run -p 8080:8080 smartclinic-backend
```

## 🔧 Configuration

### Environment Variables
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRATION`: Token expiration time in milliseconds
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed origins

## 📝 API Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## 🐛 Troubleshooting

### Database Issues
- Database file `smartclinic.db` is created automatically
- If corrupted, delete and restart the application

### Port Already in Use
```bash
# Change port in application.properties
server.port=8081
```

### JWT Token Expired
- Token expires after 24 hours by default
- Login again to get a new token

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT.io](https://jwt.io/)
- [SQLite](https://www.sqlite.org/)

## 👥 Contributors

Converted from original C# WPF desktop application to Spring Boot REST API.

## 📄 License

This project is licensed under the MIT License.
