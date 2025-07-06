
#  Smart Productivity Tracker

A full-stack MERN-based Productivity Tracker to manage tasks, visualize progress, and boost productivity with clean analytics.

---

##  Live Links

-  Frontend (Client): [https://smart-frontend.onrender.com](https://smart-frontend.onrender.com)
- Backend (API): [https://smart-productivity-tracker.onrender.com](https://smart-productivity-tracker.onrender.com)

---
## 📸 Screenshots

### 🌞 Dashboard (Light Mode)
![Dashboard Light](./assets/screens/dashboard-light.png)

### ⏱️ Pomodoro Timer View
![Pomodoro Timer](./assets/screens/dashboard-pomodoro.png)


##  Features

- 🔐 JWT-Based Authentication (Signup/Login)
- 📅 Add, Edit, Delete Tasks with Deadline
- 📈 Dashboard with Analytics (Recharts)
- ⏱️ Pomodoro Timer Integration
- 🗓️ Calendar View for Task Tracking
- 📦 MongoDB for persistent storage
- ✨ Clean UI using TailwindCSS
- ☁️ Fully deployed on Render (backend) & Render Static Site (client)

---

## ⚙ Tech Stack

- Frontend: React.js, TailwindCSS, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT, bcryptjs
- Charts: Recharts
- Deployment: Render (Backend), Render Static Site (Client)

---

## 🧩 Project Structure

```

smart-productivity-tracker/
├── client/      # React Frontend
│   └── src/
├── backend/     # Express Backend
│   └── models/, routes/, controllers/
└── README.md

````

---

## 📥 Setup Locally

```bash
git clone https://github.com/meghana5226/smart-productivity-tracker.git
cd smart-productivity-tracker
````

### ➤ Setup Backend

```bash
cd backend
npm install

# .env file format:
# MONGO_URI=your_mongo_connection_url
# JWT_SECRET=your_secret_key

npm start
```

### ➤ Setup Frontend

```bash
cd ../client
npm install
npm start
```

Frontend will run on `http://localhost:3000`
Backend will run on `http://localhost:10000`

---

## 👩‍💻 Author

*Bommishetti Meghana*
🔗 GitHub: [@meghana5226](https://github.com/meghana5226)
📧 Email: [bommishettimeghana5226@gmail.com](mailto:bommishettimeghana5226@gmail.com)





