⭐ FlexLiving Reviews Dashboard

A full-stack dashboard for managing, filtering, approving, and displaying guest reviews for FlexLiving properties.
The project includes a React frontend and a Node.js/Express backend that stores approved review IDs and normalizes review data.

✨ Features
🖥️ Dashboard (Admin Side)

View all guest reviews

Filter by:

Listing name

Star rating

Newest / Oldest date

Approve reviews with one click

Approved reviews are saved persistently (JSON file)

Clean, responsive UI

🌍 Public Page (Property Page)

Displays only approved reviews

Shows average rating

Displays:

Guest name

Listing

Date

Rating

Review text

🏗️ Tech Stack
Frontend

⚛️ React + Vite

🎨 Custom CSS

🔗 Axios

Backend

🟢 Node.js + Express

🔄 CORS

📁 JSON file storage

🔧 Review normalization / filtering logic

📂 Project Structure
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

🔧 Installation
Clone the repository
git clone https://github.com/AyaMidani/flexliving-reviews-dashboard.git
cd flexliving-reviews-dashboard

▶️ Running the Project
Backend
cd backend
npm install
npm start


Server runs on:

http://localhost:5001

Frontend
cd frontend
npm install
npm run dev


Visit:

http://localhost:5173

🔑 Environment Variables

Inside /frontend/.env:

VITE_API_URL=http://localhost:5001/api
