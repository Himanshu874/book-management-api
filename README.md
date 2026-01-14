# Book Management API

A RESTful API for managing books with support for CRUD operations and bulk CSV imports. Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- Create, read, update, and delete books
- Bulk import books from CSV files
- MongoDB integration with Mongoose
- TypeScript for type safety
- Input validation and error handling
- CSV parsing and validation
- Request logging with Morgan
- Unit testing with Jest

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **File Upload**: Multer
- **Testing**: Jest
- **Other**: dotenv, cookie-parser, morgan

## Prerequisites

- Node.js 
- MongoDB database
- npm 

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd booking-management
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. Build the TypeScript code:
```bash
npm run build
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Run Tests
```bash
npm test
```

The server will start at `http://localhost:3000` (or your configured PORT).

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Book Endpoints

#### 1. Create a Book
- **POST** `/api/book`
- **Body**:
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "publishedYear": 2024
}
```
- **Response**: Created book object

#### 2. Get All Books
- **GET** `/api/book`
- **Response**: Array of all books (sorted by creation date, newest first)

#### 3. Get Book by ID
- **GET** `/api/book/:id`
- **Response**: Single book object

#### 4. Update a Book
- **PUT** `/api/book/:id`
- **Body**:
```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "publishedYear": 2025
}
```
- **Response**: Updated book object

#### 5. Delete a Book
- **DELETE** `/api/book/:id`
- **Response**: Success message

#### 6. Bulk Import Books (CSV)
- **POST** `/api/book/import`
- **Content-Type**: `multipart/form-data`
- **Body**: Form data with `file` field containing CSV file
- **CSV Format**:
```csv
title,author,publishedYear
"The Great Gatsby","F. Scott Fitzgerald",1925
"1984","George Orwell",1949
```
- **Response**: Import summary with added books count and any errors

## Book Schema

```typescript
{
  title: string;    
  author: string;       
  publishedYear: number;
  createdAt: Date;     
  updatedAt: Date;     
}
```

## CSV Import

The bulk import feature allows you to upload CSV files with book data. The API will:
- Parse the CSV file
- Validate each row
- Create books in the database
- Return a summary with successful imports and any errors

**CSV Requirements**:
- Must have headers: `title`, `author`, `publishedYear`
- All fields are required
- `publishedYear` must be a valid number
- File must have `.csv` extension


## Testing

The project includes unit tests using Jest. Run tests with:
```bash
npm test
```


