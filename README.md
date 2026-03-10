![Angular](https://img.shields.io/badge/Angular-17-red)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

# 🛒 Product CRUD Application

A full-stack CRUD application built using **Angular, Node.js, Express, and PostgreSQL (NeonDB)**.
The application allows users to **create, view, update, and delete product information** through a clean single-page interface.

---

## 🚀 Tech Stack

Frontend:

* Angular
* TypeScript
* HTML/CSS

Backend:

* Node.js
* Express.js

Database:

* PostgreSQL
* NeonDB (Serverless Cloud Database)

Tools:

* DBeaver
* Concurrently
* Nodemon

---

## 📂 Project Structure

```
product-crud-app
│
├── client        # Angular frontend
├── server        # Node + Express backend
├── README.md
└── package.json
```

---

## ⚙️ Features

* Add new products
* View product list
* Update product information
* Delete products
* Dropdown binding for product category
* REST API integration
* Cloud database using NeonDB
* **Product Categories & Statistics page** - View products grouped by category with detailed breakdowns

---

## 🗄 Database Schema

```sql
CREATE TABLE products (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100),
 price NUMERIC,
 category VARCHAR(50),
 status VARCHAR(50)
);
```

---

## 🛣 Application Routes

| Route           | Component          | Description                      |
| --------------- | ----------------- | -------------------------------- |
| `/`             | Home              | Dashboard with quick links       |
| `/products`     | Product           | Product list with add form       |
| `/categories`   | Categories        | Statistics & category breakdown |
| `/about`        | About             | About the application            |
| `/add-product`  | AddProduct       | Standalone add product form      |

---

## 🛠 Installation

### 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/product-crud-app.git
cd product-crud-app
```

### 2️⃣ Install Dependencies

```
npm install
cd client && npm install
cd ../server && npm install
```

---

### 3️⃣ Configure Environment Variables

Create `.env` inside **server/**

```
DATABASE_URL=your_neon_connection_string
PORT=3000
```

---

### 4️⃣ Run Application

```
npm run dev
```

Frontend:

```
http://localhost:4200
```

Backend API:

```
http://localhost:3000/api/products
```

---

## 📡 API Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /api/products     | Get all products |
| POST   | /api/products     | Add new product  |
| PUT    | /api/products/:id | Update product   |
| DELETE | /api/products/:id | Delete product   |

---

## 🧠 Learning Outcomes

This project demonstrates:

* Angular component communication
* REST API integration
* Express backend architecture
* PostgreSQL database queries
* Environment variable management
* Full-stack application structure

---

## 👨‍💻 Author

Sarthak Gour
B.Tech Computer Science (AI/ML)

GitHub: https://github.com/sarthakgour9
