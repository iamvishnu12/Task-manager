📌 Task Management App (React + Firebase)
A fully functional Task Management Application built using React, Firebase, and Vercel.
This app allows users to create, organize, update, and track tasks using a clean UI inspired by the provided Figma design.

🚀 Live Demo
🔗 Deployment URL: https://taskmanager-mko835cuq-iamvishnu12s-projects.vercel.app

📸 Screenshots
(Add screenshots here – board view, list view, modals)

✨ Features
🔒 1. User Authentication
Firebase Authentication

Google Sign-In

Secure login & logout

Supports session persistence

📝 2. Task Management
Add new tasks

Edit existing tasks

Delete tasks

Task description

Due dates

Category tags (work, personal)

Status system:

To Do

In Progress

Done

🗂️ 3. Board View (Drag & Drop)
Kanban-style columns

Move tasks using drag & drop

Real-time status updates

Column counters

Add tasks inside "To Do" column

📄 4. List View
Table format overview of all tasks

Inline status update dropdown

Edit & delete options

Category & date visibility

Search filter support

🔍 5. Filtering & Search
Filter by:

Category (work/personal)

Completed tasks

Search by task title

📱 6. Responsive Design
Fully responsive across mobile, tablet & desktop

Smooth layout based on Figma design

🛠️ Tech Stack
Frontend
React (Vite)

CSS

@hello-pangea/dnd (Drag & Drop)

Backend / Database
Firebase Authentication

Firebase Firestore

Deployment
Vercel

📁 Folder Structure
css
Copy code
src/
 ├── components/
 │    ├── Header.jsx
 │    ├── Sidebar.jsx
 │    ├── TaskBoard.jsx
 │    ├── TaskCard.jsx
 │    ├── TaskFormModal.jsx
 │    ├── TaskEditModal.jsx
 │
 ├── hooks/
 │    └── useTasks.js
 │
 ├── utils/
 │    └── firebase.js
 │
 ├── App.jsx
 ├── main.jsx
▶️ Run the Project Locally
1️⃣ Clone the repository
bash
Copy code
git clone https://github.com/YOUR_USERNAME/task-manager-app.git
cd task-manager-app
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Add Firebase environment variables
Create a file:

bash
Copy code
.env
Add:

ini
Copy code
VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx
4️⃣ Run the development server
bash
Copy code
npm run dev
5️⃣ Build for production
bash
Copy code
npm run build
🔥 Deployment Instructions
✔ Deploy on Vercel
Push code to GitHub

Go to https://vercel.com

Import GitHub repo

Add your environment variables in
Project → Settings → Environment Variables

Redeploy

✔ Add authorized domain in Firebase
Firebase Console → Authentication → Settings → Authorized Domains
Add:

nginx
Copy code
localhost
your-vercel-url.vercel.app
✔ Firestore Security Rules
bash
Copy code
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /tasks/{taskId} {
      allow read, write: if request.auth != null &&
                         request.auth.uid == resource.data.userId;
    }

  }
}
🧠 Challenges & Solutions
🟣 Challenge 1: Drag & Drop breaking UI
Solution:
Created a dedicated TaskCard component with stable refs and isolated styling.

🟣 Challenge 2: Edit modal showing inside board
Solution:
Separated Add (TaskFormModal) and Edit (TaskEditModal) into two components.
Fixed centralized modal UI using absolute overlays.

🟣 Challenge 3: Firebase environment variables not loading on Vercel
Solution:
Moved all Firebase keys into Vercel Environment Variables with VITE_ prefix.

🟣 Challenge 4: Board and List Filters not syncing
Solution:
Added centralized filtering using useMemo and passed searchTerm globally.

🎯 Summary
This project demonstrates:

✔ Firebase integration
✔ Authentication
✔ Real-time Firestore
✔ Drag & drop board
✔ Search + filtering
✔ Responsive UI
✔ Clean architecture
