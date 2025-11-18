⭐ FlexLiving Reviews Dashboard

A full-stack system for managing, filtering, approving, and displaying guest reviews for FlexLiving properties.
Includes a React + Vite frontend and a Node.js/Express backend with persistent storage for approved reviews.

✨ Features
🖥️ Admin Dashboard

View all imported guest reviews

Filter reviews by:

Listing name

Star rating

Newest / Oldest date

Approve reviews with a single click

Approved reviews are saved persistently (JSON file)

Modern, responsive UI

🌍 Public Property Page

Shows only approved reviews

Displays average rating

Includes:

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

🔧 Normalization & filtering logic

📂 Project Structure
flexliving-reviews-dashboard/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── mock/
│   ├── approved/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   └── css/
    ├── App.jsx
    └── main.jsx

🔧 Installation

Clone the repository:

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

Create /frontend/.env:

VITE_API_URL=http://localhost:5001/api
