# Task Management API

The **Task Management API** is a RESTful backend service built with **Node.js**, **Express**, **TypeScript**, and **MySQL**.  
It enables you to manage tasks with operations like create, read, update, and delete, along with advanced features like **pagination, filtering, and API documentation**.

---

## Features
- **CRUD Operations:** Manage tasks seamlessly.
- **Validation:** Routes and Input validation with **Zod**.
- **Pagination & Filtering:** Use query parameters like `?page=1&limit=10&status=PENDING`.
- **Unified Responses:** Consistent API responses using `ApiResponse` and `ApiError`.
- **Error Handling:** Centralized error handling middleware.
- **Swagger Documentation:** Interactive docs at `/docs`.
- **Dockerized Database:** MySQL database runs via Docker container for easy setup.

---

## Tech Stack
- **Backend:** Node.js + Express
- **Language:** TypeScript
- **Database:** MySQL (Dockerized)
- **Validation:** Zod
- **Documentation:** Swagger (OpenAPI 3)
- **Utilities:** ESLint, Prettier

---

## Project Structure

```bash
src/
├── controllers/       # Route handlers
├── db/                # Database connection & queries
├── models/            # TypeScript types/interfaces
├── routes/            # API route definitions
├── utils/             # ApiResponse, ApiError, asyncHandler
├── validations/       # Zod validation schemas
├── app.ts             # Express app configuration
└── server.ts          # Server entry point
```

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/aunrxg/sde-assign.git
cd sde-assign
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment 
```ts
PORT=3000
DB_HOST=localhost
DB_USER=aunrxg
DB_PASS=mypass
DB_NAME=mydb
DB_PORT=3306
```

### 4. Spin up MySQL server with Docker
```bash
docker-componse up -d
```

### 5. Run Server
```bash
npm run dev
```

---

## API Endpoints
The Task Management API follows REST conventions. All endpoints return JSON responses with a consistent structure.

### 1. Create Task
#### Endpoint:
```bash
POST /tasks
```
#### Description:
Create a new task.
#### Request Body:
```json
{
  "title": "Buy Milk",
  "description": "Get 2L milk from the supermarket",
  "status": "PENDING"
}
```
#### Response (201 Created):
```json
{
  "statusCode": 201,
  "data": {
    "task": {
      "id": "b3f4d23c-4e27-4f3c-a81c-0123456789ab",
      "title": "Buy Milk",
      "description": "Get 2L milk from the supermarket",
      "status": "PENDING",
      "createdAt": "2025-07-23T10:00:00.000Z",
      "updatedAt": "2025-07-23T10:00:00.000Z"
    }
  },
  "message": "Task created successfully",
  "success": true
}
```
#### Possible Errors: 
* `400 Bad Request` (Validation Error)
* `500 Internal Server Error`

### 2. Get all Tasks
#### Endpoint:
```bash
GET /tasks
```
#### Description:
Retrieve a paginated list of all tasks, optionally filtered by `status` or `title`.
#### Query Parameters: 
* `page` (integer, optional, default = 1)
* `limit` (integer, optional, default = 10)
* `status` (string, optional: `PENDING`, `COMPLETED`, `IN_PROGRESS`)
* `title` (string, optional: partial match for task title)
#### Example Request:
```json
GET /tasks?page=1&limit=5&status=PENDING&title=milk
```
#### Response (200 OK):
```json
{
  "statusCode": 200,
  "data": {
    "task": [
      {
        "id": "b3f4d23c-4e27-4f3c-a81c-0123456789ab",
        "title": "Buy Milk",
        "description": "Get 2L milk from the supermarket",
        "status": "PENDING",
        "createdAt": "2025-07-23T10:00:00.000Z",
        "updatedAt": "2025-07-23T10:00:00.000Z"
      }
    ],
    "total": 15,
    "page": 1,
    "limit": 5,
    "totalPages": 3
  },
  "message": "Tasks fetched successfully",
  "success": true
}

```
#### Possible Errors: 
* `400 Bad Request` (Validation Error)
* `500 Internal Server Error`



### 3. Get Task by ID
#### Endpoint:
```bash
GET /tasks/:id
```
#### Description:
Retrieve details of a specific task by its `id`.

#### Example Request:
```json
GET /tasks/b3f4d23c-4e27-4f3c-a81c-0123456789ab
```
#### Response (200 OK):
```json
{
  "statusCode": 200,
  "data": {
    "task": {
      "id": "b3f4d23c-4e27-4f3c-a81c-0123456789ab",
      "title": "Buy Milk",
      "description": "Get 2L milk from the supermarket",
      "status": "PENDING",
      "createdAt": "2025-07-23T10:00:00.000Z",
      "updatedAt": "2025-07-23T10:00:00.000Z"
    }
  },
  "message": "Task fetched successfully",
  "success": true
}
```
#### Possible Errors: 
* `404 Not Found` (If the task does not exist)

### 4. Update Task

#### Endpoint: 

```bash
PUT /tasks/:id
```

#### Description: 

Update details of an existing task.

#### Request Body:
```json
{
  "title": "Buy Milk and Bread",
  "description": "Get 2L milk and a loaf of bread",
  "status": "IN_PROGRESS"
}
```

#### Response (200 OK):
```json
{
  "statusCode": 200,
  "data": {
    "task": {
      "id": "b3f4d23c-4e27-4f3c-a81c-0123456789ab",
      "title": "Buy Milk and Bread",
      "description": "Get 2L milk and a loaf of bread",
      "status": "IN_PROGRESS",
      "createdAt": "2025-07-23T10:00:00.000Z",
      "updatedAt": "2025-07-23T12:00:00.000Z"
    }
  },
  "message": "Task updated successfully",
  "success": true
}
```

#### Possible Errors: 

* `400 Bad Request` (Validation error)
* `404 Not Found` (Task not found)

### 5. Delete Task

#### Endpoint: 
```bash
DELETE /tasks/:id
```

#### Description:

Delete a task by its `id`

#### Example Request:

```bash
DELETE /tasks/b3f4d23c-4e27-4f3c-a81c-0123456789ab
```

#### Response (200 OK):
```css
(no response body)
```

#### Possible Errors: 

* `404 Not Found` (Task not found)

### Error Response Formate (Global)

All errors follow this structure:

```json
{
  "statusCode": 400,
  "message": "Validation Error",
  "errors": [
    "title: Title must be at least 3 characters",
    "status: Invalid enum value. Expected PENDING | COMPLETED | IN_PROGRESS"
  ],
  "data": null,
  "success": false
}
```

---

