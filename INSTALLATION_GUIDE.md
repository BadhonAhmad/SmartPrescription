# SmartClinic - Complete Installation Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)
6. [Next Steps](#next-steps)

---

## Prerequisites

### Required Software

#### For Backend (Spring Boot)
- **Java Development Kit (JDK) 17 or higher**
  - Download: https://adoptium.net/
  - Verify installation: `java -version`

- **Apache Maven 3.6+**
  - Download: https://maven.apache.org/download.cgi
  - Verify installation: `mvn -version`

#### For Frontend (Next.js)
- **Node.js 18+ and npm**
  - Download: https://nodejs.org/
  - Verify installation: `node -version` and `npm -version`

#### Optional Tools
- **Git** (for cloning repository)
- **Postman** (for API testing)
- **VS Code** (recommended IDE)

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```powershell
cd C:\Users\Nobel\Desktop\Projects\CMED\SmartClinic-main\backend
```

### Step 2: Install Dependencies

```powershell
mvn clean install
```

This will:
- Download all Maven dependencies
- Compile the Java code
- Run tests (if any)
- Create the JAR file

**Expected output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: 2.5 min
```

### Step 3: Configure Application (Optional)

Edit `src/main/resources/application.properties` if needed:

```properties
# Server configuration
server.port=8080
server.servlet.context-path=/api

# Database (SQLite - will be created automatically)
spring.datasource.url=jdbc:sqlite:smartclinic.db

# JWT Configuration
jwt.secret=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437
jwt.expiration=86400000

# Logging
logging.level.com.smartclinic=DEBUG
```

### Step 4: Run Backend Server

```powershell
mvn spring-boot:run
```

**Alternatively**, run the JAR file directly:
```powershell
java -jar target\smartclinic-backend-1.0.0.jar
```

### Step 5: Verify Backend is Running

Open PowerShell and test:

```powershell
curl -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"username":"AbuNoyim","password":"12345678"}'
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "AbuNoyim",
    "message": "Login successful"
  }
}
```

✅ **Backend is now running on http://localhost:8080/api**

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **NEW** PowerShell window:

```powershell
cd C:\Users\Nobel\Desktop\Projects\CMED\SmartClinic-main\frontend
```

### Step 2: Install Dependencies

```powershell
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- All other dependencies

**Expected output:**
```
added 345 packages in 45s
```

### Step 3: Configure Environment Variables

Create `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

**In PowerShell:**
```powershell
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
```

### Step 4: Run Frontend Development Server

```powershell
npm run dev
```

**Expected output:**
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 3.2s
```

✅ **Frontend is now running on http://localhost:3000**

---

## Running the Application

### Complete Startup Sequence

1. **Open TWO PowerShell windows**

2. **Window 1 - Backend:**
   ```powershell
   cd C:\Users\Nobel\Desktop\Projects\CMED\SmartClinic-main\backend
   mvn spring-boot:run
   ```
   Wait for: "SmartClinic Backend Application Started Successfully!"

3. **Window 2 - Frontend:**
   ```powershell
   cd C:\Users\Nobel\Desktop\Projects\CMED\SmartClinic-main\frontend
   npm run dev
   ```
   Wait for: "Ready in X.Xs"

4. **Open Browser:**
   - Navigate to: http://localhost:3000
   - You will be redirected to login page

5. **Login:**
   - Username: `AbuNoyim`
   - Password: `12345678`

6. **Explore:**
   - Dashboard
   - Patients
   - Prescriptions
   - Medicines

---

## Troubleshooting

### Backend Issues

#### Issue: Port 8080 already in use
**Solution:**
```properties
# Change port in application.properties
server.port=8081
```

#### Issue: Java not found
**Solution:**
```powershell
# Check Java installation
java -version

# If not installed, download from https://adoptium.net/
```

#### Issue: Maven not found
**Solution:**
```powershell
# Check Maven installation
mvn -version

# Add Maven to PATH or use Maven Wrapper
.\mvnw spring-boot:run
```

#### Issue: Database locked
**Solution:**
```powershell
# Delete database file and restart
Remove-Item smartclinic.db
mvn spring-boot:run
```

#### Issue: Dependencies not downloading
**Solution:**
```powershell
# Clear Maven cache
mvn clean install -U

# Or delete .m2 folder and reinstall
Remove-Item -Recurse ~\.m2\repository\com\smartclinic
mvn clean install
```

### Frontend Issues

#### Issue: Port 3000 already in use
**Solution:**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
$env:PORT=3001; npm run dev
```

#### Issue: Module not found errors
**Solution:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse node_modules
Remove-Item package-lock.json
npm install
```

#### Issue: API connection failed
**Solution:**
1. Check backend is running (http://localhost:8080/api/auth/login)
2. Verify `.env.local` has correct API URL
3. Check browser console for CORS errors
4. Restart both servers

#### Issue: TypeScript errors
**Solution:**
```powershell
# Ignore during development (not recommended for production)
npm run dev
```

The errors shown in VS Code are expected until dependencies are installed.

### Common Solutions

#### Clear all caches and restart:

**Backend:**
```powershell
cd backend
mvn clean
Remove-Item -Recurse target
mvn clean install
```

**Frontend:**
```powershell
cd frontend
Remove-Item -Recurse .next
Remove-Item -Recurse node_modules
npm install
npm run dev
```

---

## Next Steps

### 1. Create First Patient

1. Go to Dashboard → Patients
2. Click "Add Patient"
3. Fill in details:
   - Name: John Doe
   - Age: 35
   - Phone: 01712345678
   - Address: Dhaka, Bangladesh
   - Blood: B+
4. Click "Save"

### 2. Add Medicines

1. Go to Medicines
2. Click "Add Medicine"
3. Fill in details:
   - Brand Name: Napa
   - Generic Name: Paracetamol
   - Strength: 500mg
   - Type: Tablet
   - Manufacturer: Beximco
4. Click "Save"

### 3. Create Prescription

1. Go to Prescriptions
2. Click "New Prescription"
3. Select patient
4. Add chief complaint
5. Add medicines
6. Add advice
7. Save prescription

### 4. Explore Templates

- Add frequently used complaints
- Add common diagnoses
- Add standard advice
- Create medicine groups

### 5. Customize Doctor Info

1. Access doctor information settings
2. Update profile details
3. Update chamber information
4. Update visit schedule

---

## Production Deployment

### Build for Production

**Backend:**
```powershell
cd backend
mvn clean package -DskipTests
# Output: target\smartclinic-backend-1.0.0.jar
```

**Frontend:**
```powershell
cd frontend
npm run build
# Output: .next folder
```

### Run Production Build

**Backend:**
```powershell
java -jar target\smartclinic-backend-1.0.0.jar
```

**Frontend:**
```powershell
npm start
```

---

## Quick Reference

### Backend Commands
```powershell
mvn clean install          # Build project
mvn spring-boot:run        # Run development server
mvn test                   # Run tests
mvn clean package         # Build JAR for production
```

### Frontend Commands
```powershell
npm install                # Install dependencies
npm run dev               # Run development server
npm run build             # Build for production
npm start                 # Run production server
npm run lint              # Run linter
```

### Useful URLs
- Backend API: http://localhost:8080/api
- Frontend: http://localhost:3000
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard

### Default Credentials
- Username: `AbuNoyim`
- Password: `12345678`

---

## Support

### Documentation
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Full Stack: `README_FULLSTACK.md`

### Getting Help
- Check error messages in terminal
- Review logs in console
- Check browser developer tools (F12)
- Review API responses with Network tab

---

## Summary Checklist

Before running the application:

- [ ] Java 17+ installed and verified
- [ ] Maven 3.6+ installed and verified
- [ ] Node.js 18+ installed and verified
- [ ] Backend dependencies installed (`mvn clean install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can login with default credentials

If all checkboxes are ticked, you're ready to use SmartClinic! 🎉

---

**Need more help? Check the detailed README files in each directory!**
