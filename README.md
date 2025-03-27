# Node.js Assessment Submission

## ✅ Implemented Features
- **Authentication API**
  - Mock login with JWT token response
  - Hardcoded admin credentials for testing
- **Meeting Management**
  - Full CRUD operations (Create, Read, Update, Delete)
  - In-memory data persistence
- **Error Handling**
  - Proper HTTP status codes (401, 404, etc.)
  - Consistent error response format

## 🔐 Test Credentials
```json
{
  "username": "admin@gmail.com",
  "password": "admin123"
}
## Known Issues
- Meeting routes require authentication middleware in production
- CORS headers not configured (only affects frontend testing)
- Implemented mock mode for assessment purposes
