# ⭐ FlexLiving Reviews Dashboard
A full-stack system for managing, filtering, approving, and displaying guest reviews for FlexLiving properties. Includes a **React + Vite frontend** and a **Node.js/Express backend** with persistent JSON storage for approved reviews.

---

## ✨ Features
### 🖥️ Admin Dashboard
- View all imported guest reviews
- Filter reviews by:
  - Listing name
  - Star rating
  - Newest / Oldest date
- Approve reviews with a single click
- Approved reviews are saved persistently (JSON file)
- Clean, responsive UI

### 🌍 Public Property Page
- Shows only approved reviews
- Displays average rating
- Shows:
  - Guest name
  - Listing
  - Date
  - Rating
  - Review text

---

## 🏗️ Tech Stack
### Frontend
- React + Vite
- Axios
- Custom CSS

### Backend
- Node.js + Express
- CORS
- JSON file storage
- Review normalization logic

---

## 📂 Project Structure
backend/  
  controllers/  
  routes/  
  mock/  
  approved/  
  server.js  

frontend/  
  src/  
    components/  
    pages/  
    utils/  
    css/  
  App.jsx  
  main.jsx  

---

## 🔧 Installation
git clone https://github.com/AyaMidani/flexliving-reviews-dashboard.git  
cd flexliving-reviews-dashboard  

---

## ▶️ Running the Project
### Backend
cd backend  
npm install  
npm start  

Backend runs on: http://localhost:5001

### Frontend
cd frontend  
npm install  
npm run dev  

Frontend runs on: http://localhost:5173
