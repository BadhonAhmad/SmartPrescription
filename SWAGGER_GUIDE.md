# 📚 Swagger API Documentation Guide

## Overview

SmartPrescription uses **Swagger/OpenAPI 3.0** for interactive API documentation. This provides a user-friendly interface to explore, test, and understand all available API endpoints.

## Accessing Swagger UI

### Local Development
Once the backend is running, access Swagger UI at:
```
http://localhost:8080/api/swagger-ui.html
```

### OpenAPI Specification
The raw OpenAPI JSON specification is available at:
```
http://localhost:8080/api/v3/api-docs
```

## Features

### 1. **Interactive Testing**
- Test API endpoints directly from the browser
- No need for Postman or curl commands
- Instant response visualization

### 2. **Authentication Support**
- JWT Bearer token authentication
- Easy token management
- Test protected endpoints seamlessly

### 3. **Schema Exploration**
- View request/response models
- See data types and validation rules
- Understand API contracts

### 4. **Example Requests**
- Pre-filled example data
- Copy-paste ready requests
- Learn API usage patterns

## How to Use Swagger UI

### Step 1: Start the Backend
```bash
cd backend
mvn spring-boot:run
```

### Step 2: Open Swagger UI
Navigate to: http://localhost:8080/api/swagger-ui.html

### Step 3: Authenticate (For Protected Endpoints)

1. **Register/Login First** (if you don't have a token)
   - Scroll to **Authentication** section
   - Expand `POST /auth/register` or `POST /auth/login`
   - Click "Try it out"
   - Fill in the request body
   - Click "Execute"
   - Copy the JWT token from the response

2. **Set Authorization Token**
   - Click the **"Authorize"** button (lock icon) at the top
   - In the popup, enter: `Bearer YOUR_JWT_TOKEN`
   - Click "Authorize"
   - Click "Close"

3. **Now you can access all protected endpoints!**

### Step 4: Test an Endpoint

#### Example: Get All Prescriptions
1. Scroll to **Prescription Management** section
2. Find `GET /API/v1/prescription`
3. Click on it to expand
4. Click **"Try it out"**
5. Click **"Execute"**
6. View the response below

#### Example: Create a Prescription
1. Find `POST /API/v1/prescription`
2. Click **"Try it out"**
3. Edit the request body JSON:
```json
{
  "prescriptionDate": "2025-11-11",
  "patientName": "John Doe",
  "patientAge": "45",
  "patientGender": "M",
  "diagnosis": "Common Cold",
  "medicines": [
    {
      "medicine": "Paracetamol 500mg",
      "schedule": "1+1+1",
      "duration": "5 days",
      "note": "After meals"
    }
  ],
  "chiefComplaints": ["Fever", "Headache"],
  "advice": "Rest and drink plenty of fluids",
  "nextVisitDate": "2025-11-18"
}
```
4. Click **"Execute"**
5. Check the response code (201 for success)

## API Endpoints Summary

### 🔐 Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/logout` | User logout | Yes |

### 📝 Prescription Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/API/v1/prescription` | Get all prescriptions | Yes |
| POST | `/API/v1/prescription` | Create prescription | Yes |
| GET | `/API/v1/prescription/{id}` | Get prescription by ID | Yes |
| PUT | `/API/v1/prescription/{id}` | Update prescription | Yes |
| DELETE | `/API/v1/prescription/{id}` | Delete prescription | Yes |
| GET | `/API/v1/prescription/report/daywise` | Day-wise report | Yes |

### 👥 Patient Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/API/v1/patient` | Get all patients | Yes |
| POST | `/API/v1/patient` | Create patient | Yes |
| GET | `/API/v1/patient/{id}` | Get patient by ID | Yes |
| PUT | `/API/v1/patient/{id}` | Update patient | Yes |
| DELETE | `/API/v1/patient/{id}` | Delete patient | Yes |

### 💊 Medicine Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/API/v1/medicine/search` | Search medicines | Yes |
| GET | `/API/v1/medicine` | Get all medicines | Yes |
| POST | `/API/v1/medicine` | Add medicine | Yes |

## Common Response Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid authentication token
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Tips & Best Practices

### ✅ DO:
- Always authenticate before testing protected endpoints
- Check response schemas to understand data structures
- Use the "Try it out" feature for quick testing
- Review example values for correct data formats
- Copy JWT tokens carefully (include full token)

### ❌ DON'T:
- Don't forget to add "Bearer " prefix before the token
- Don't test with invalid data (check schema requirements)
- Don't share your JWT tokens
- Don't skip authentication for protected endpoints

## Troubleshooting

### Issue: "Unauthorized" Error
**Solution**: 
- Ensure you've clicked the "Authorize" button
- Verify token format: `Bearer YOUR_JWT_TOKEN`
- Check if token hasn't expired (24 hours validity)
- Login again if token is expired

### Issue: "400 Bad Request"
**Solution**:
- Validate request body against schema
- Check required fields are filled
- Ensure data types are correct (strings, numbers, dates)
- Review validation error messages in response

### Issue: Swagger UI Not Loading
**Solution**:
- Verify backend is running on port 8080
- Check URL: http://localhost:8080/api/swagger-ui.html
- Clear browser cache
- Check browser console for errors

### Issue: CORS Error
**Solution**:
- Ensure CORS is configured in SecurityConfig
- Check allowed origins include Swagger UI
- Restart backend after configuration changes

## Advanced Features

### Filtering Endpoints
- Use the search box at the top to filter endpoints
- Filter by tags (Authentication, Prescription Management, etc.)
- Filter by HTTP method (GET, POST, PUT, DELETE)

### Sorting
- Endpoints are sorted by HTTP method by default
- Tags are sorted alphabetically
- Change sorting in configuration if needed

### Download OpenAPI Spec
- Click on the `/v3/api-docs` link at the top
- Save the JSON file
- Import into Postman, Insomnia, or other API clients

## Integration with Other Tools

### Postman
1. Download OpenAPI spec from `/v3/api-docs`
2. Open Postman
3. Import → Upload File → Select downloaded JSON
4. All endpoints will be imported as a collection

### Insomnia
1. Copy OpenAPI spec URL: `http://localhost:8080/api/v3/api-docs`
2. Open Insomnia
3. Import → From URL → Paste URL
4. Collection created with all endpoints

## Configuration

### Customize Swagger UI (application.properties)
```properties
# Swagger/OpenAPI Configuration
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha
springdoc.swagger-ui.tryItOutEnabled=true
```

### Disable Swagger in Production
```properties
springdoc.swagger-ui.enabled=false
springdoc.api-docs.enabled=false
```

## Support

For issues or questions about API documentation:
- Check endpoint descriptions in Swagger UI
- Review request/response schemas
- Consult the main README.md
- Open an issue on GitHub

---

**Happy API Testing! 🚀**
