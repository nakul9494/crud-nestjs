# CRUD NestJS Application

A full-stack CRUD (Create, Read, Update, Delete) application built with NestJS backend, React frontend, and PostgreSQL database using TypeORM for database operations.

## 🚀 Tech Stack

- **Backend**: NestJS
- **Frontend**: React
- **Database**: PostgreSQL
- **ORM**: TypeORM

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL
- Git

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/nakul9494/crud-nestjs.git
cd crud-nestjs
```

### 2. Backend Setup (NestJS)
```bash
# Navigate to backend directory (if separate)
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### 3. Frontend Setup (React)
```bash
# Navigate to frontend directory (if separate)
cd frontend

# Install dependencies
npm install
```

### 4. Database Setup
```bash
# Create PostgreSQL database
createdb crud_nestjs_db

# Update your .env file with database credentials
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=crud_nestjs_db
```

## 🚀 Running the Application

### Start Backend (NestJS)
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```
The backend server will start on `http://localhost:3000`

### Start Frontend (React)
```bash
# Development mode
npm start
```
The frontend application will start on `http://localhost:3001` (or the next available port)

## 📡 API Endpoints

The application provides the following REST API endpoints for user management:

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `http://localhost:3000/user` | Create a new user |
| **GET** | `http://localhost:3000/user` | Get all users |
| **PATCH** | `http://localhost:3000/user/1` | Update user with ID=1 |
| **DELETE** | `http://localhost:3000/user/3` | Delete user with ID=3 |

### Example API Usage

#### Create a new user
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

#### Get all users
```bash
curl -X GET http://localhost:3000/user
```

#### Update a user
```bash
curl -X PATCH http://localhost:3000/user/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith"}'
```

#### Delete a user
```bash
curl -X DELETE http://localhost:3000/user/3
```

## 📮 Postman Collection

You can test the API endpoints using the provided Postman collection:

[**Import Postman Collection**](https://ctrl949494-7712541.postman.co/workspace/Nakul's-Workspace~ba8efda0-fcae-494c-8710-d39b0e4db199/collection/48566545-d4836024-ab5d-467c-aa7f-2bb09381b08f?action=share&source=copy-link&creator=48566545)

## 🏗️ Project Structure

```
crud-nestjs/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── user/           # User module
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   ├── package.json
│   └── .env
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.js          # Main App component
│   └── package.json
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=crud_nestjs_db

# Application Configuration
PORT=3000
NODE_ENV=development
```

## 🧪 Available Scripts

### Backend
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run test` - Run tests

### Frontend
- `npm start` - Start the development server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Nakul**
- GitHub: [@nakul9494](https://github.com/nakul9494)
