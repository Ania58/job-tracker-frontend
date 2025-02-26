# JobSync Frontend

This is the frontend of **JobSync**, a job application tracking web app built with **React** and styled using **Tailwind CSS**. It allows users to register, log in, add job applications, track progress, and manage job details efficiently.

## 🚀 Features

- 📌 **User Authentication** (Register/Login with email & password and Google)
- 📝 **Add, Edit, and Delete** job applications
- 📊 **Track job status** (Applied, Interviewing, Offer, Rejected, Ghosted)
- 📅 **Set application dates and notes** for each job
- 🔍 **View detailed job application information**
- 🌐 **Responsive UI** using Tailwind CSS

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **State Management:** Context API
- **API Requests:** Axios
- **Backend:** Node.js, Express, PostgreSQL (separate repository)

## 📂 Project Structure

```
📦 frontend 
├── 📁 css
│ ├── 📄 main.css
├── 📁 node_modules
├── 📁 public
│ ├── 📄 job-offers.png
├── 📁 src
│ ├── 📁 api
│ │ ├── 📄 axios.js
│ ├── 📁 components
│ │ ├── 📁 auth
│ │ │ ├── 📄 Login.jsx
│ │ │ ├── 📄 Logout.jsx
│ │ │ ├── 📄 Register.jsx
│ │ ├── 📁 context
│ │ │ ├── 📄 UserProvider.jsx
│ │ ├── 📁 jobManagement
│ │ │ ├── 📄 JobForm.jsx
│ │ │ ├── 📄 UserJobs.jsx
│ │ │ ├── 📄 ViewJob.jsx
│ │ ├── 📁 layout
│ │ │ ├── 📄 Footer.jsx
│ │ │ ├── 📄 Header.jsx
│ │ │ ├── 📄 MainPage.jsx
├── 📄 App.jsx
├── 📄 main.jsx
├── 📄 index.html
├── 📄 package.json
├── 📄 README.md
├── 📄 vite.config.js
```

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/job-tracker-frontend.git
cd job-tracker-frontend
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Set Up Environment Variables
```ini
VITE_API_URL=https://your-backend-url.com
```

### 4️⃣ Start the Development Server
```bash
npm run dev
```
