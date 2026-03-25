![Angular](https://img.shields.io/badge/Angular-17-red)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

# 🛒 Product Management Dashboard

A modern full-stack CRUD application built using **Angular, Node.js, Express, and PostgreSQL**. Features a redesigned **Product Management Dashboard** (/products) with card-based UI, search, form validation, responsive design, and enhanced statistics.

---

## 🚀 Tech Stack

**Frontend:** Angular • TypeScript • HTML/CSS • Standalone Components

**Backend:** Node.js • Express.js

**Database:** PostgreSQL • NeonDB (Serverless)

**Tools:** Concurrently • Nodemon • DBeaver

---

## 📂 Project Structure

```
angular-product-management/
│
├── client/          # Angular frontend
├── server/          # Node + Express backend
├── uploads/         # Product images
├── README.md
└── package.json
```

---

## ✨ Key Features

✅ **Modern Product Dashboard** (`/products`)
* Card-based product display (vs table)
* Real-time search/filter (name, category)
* Form validation + required fields
* Image preview/upload
* Live statistics (counts, categories)
* Responsive mobile-first design
* Hover animations & gradients

✅ **Full CRUD Operations**
* Add/Edit/Delete products
* Status management (Available/Out-of-Stock)
* Image upload handling

✅ **Additional Pages**
* `/` - Home dashboard
* `/categories` - Category analytics
* `/add-product` - Dedicated add form
* `/about` - Application info

---

## 🛣 Routes

| Route          | Description                          | Features                          |
|----------------|--------------------------------------|-----------------------------------|
| `/products`    | **Main Dashboard**                  | Cards, search, stats, CRUD        |
| `/`            | Home                                | Quick links                       |
| `/categories`  | Category Analytics                  | Grouped statistics                |
| `/add-product` | Standalone Add Form                 | Dedicated product creation        |
| `/about`       | About                               | App information                   |

---

## 🗄 Database Schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  category VARCHAR(50),
  status VARCHAR(20) DEFAULT 'Available',
  image_url VARCHAR(255)
);
```

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repo>
cd angular-product-management
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### 2. Environment (.env in server/)
```bash
DATABASE_URL=your_neon_connection_string
PORT=3000
UPLOAD_DIR=./uploads
```

### 3. Run Development
```bash
npm run dev
# or
cd client && ng serve
cd ../server && npm start
```

**Frontend:** http://localhost:4200  
**API:** http://localhost:3000/api/products

---

## 📡 API Endpoints

```bash
GET    /api/products      # List all
POST   /api/products      # Create (multipart/form-data)
PUT    /api/products/:id  # Update
DELETE /api/products/:id  # Delete
```

---

## 🎨 UI Improvements (Recent)

- **Card Layout**: Modern product cards with images
- **Search**: Live filtering by name/category
- **Stats**: Dynamic cards with gradients/hover
- **Responsive**: Mobile-first, works on all devices
- **Validation**: Form validation + error states
- **Animations**: Smooth transitions & effects
- **Images**: Preview + upload support

---

## 🧪 Testing the Dashboard

1. Navigate to **http://localhost:4200/products**
2. Add a product (fill all fields, upload image)
3. Search by name or category
4. Edit/Delete existing products
5. Check stats update live
6. Resize browser - fully responsive

---

## 🧠 What's New

**Modern Design System:**
- Tailwind-inspired spacing/color scheme
- Glassmorphism cards & gradients
- Micro-interactions (hover, focus)
- Accessibility-ready form labels

---

## 👨‍💻 Author

**Sarthak Gour**  
B.Tech Computer Science (AI/ML)

[GitHub](https://github.com/sarthakgour9)

---

## 📄 License

MIT License - feel free to use and modify!

