# FriendDude App - MERN Stack Social Media Platform

FriendDude App is a feature-rich social media platform built using the MERN stack (MongoDB, Express, React, Node.js). It enables users to connect with friends, share posts, and discover new connections through recommendations. The app includes a clean UI, responsive design, and modular components for a seamless user experience.

---

## 🚀 **Live Demo**

### [FriendDude App Live Demo on Render](https://FriendDude-App-mern.onrender.com/)

> **Note**: The app is hosted on a free Render tier, so it might take up to **30 seconds to load**.

**Test User Accounts:**
1. **Username**: `akhil`  |  **Password**: `123`

---

## 📸 **Snapshots**

### **Registration Page**
![Registration]([./snapshots/register.png](https://github.com/user-attachments/assets/5f68f604-d031-4928-81f0-f5f07c9d0f1f))

### **Login Page**
![Login](./snapshots/login.png)

### **User Dashboard**
- **Friend Recommendations**
![Friend Recommendations](./snapshots/friend_recommendations.png)

- **Friend List and Unfriend Feature**
![Friends and Unfriend](./snapshots/friends.png)

### **Searching for Friends**
![Search](./snapshots/search.png)

### **Post Sharing and Timeline**
![Posts and Timeline](./snapshots/posts.png)

---

## 🛠️ **Features**

- **Friend Management**: Send, accept, reject, or unfriend requests.
- **Friend Recommendations**: Suggests new friends based on mutual connections and common interests.
- **Post Sharing**: Share posts, view timeline updates, and engage with friends.
- **Search**: Find and connect with users by username.
- **Responsive UI**: Clean, modern, and mobile-friendly design.
- **Seamless Backend API**: Robust and secure backend for smooth data handling.

---

## 🛠️ **Tech Stack**

- **Frontend**: React, TypeScript, CSS Modules
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Passport.js, JWT
- **Hosting**: Render (Live Demo)

---

## 📚 **Getting Started Locally**

Follow these steps to set up the FriendDude App on your local machine.

### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo/FriendDude-App.git
cd FriendDude-App
```

### **2. Set Environment Variables**
Create a `.env` file in the root directory with the following variables:
```dotenv
MONGO_URI=YOUR_MONGODB_URI
SECRET=ANY_SECRET_KEY
PORT=4000
NODE_ENV=development
```

### **3. Install Dependencies**
- Install server dependencies:
  ```bash
  npm install
  ```
- Install client dependencies:
  ```bash
  cd client
  npm install
  ```

### **4. Run the Application**
- Start the server:
  ```bash
  npm start
  ```
- Start the client:
  ```bash
  cd client
  npm start
  ```

### **5. Open the App in Your Browser**
- Backend (Server): [http://localhost:4000](http://localhost:4000)
- Frontend (Client): [http://localhost:3000](http://localhost:3000)

---

## 📄 **Project Structure**
```plaintext
FriendDude-App
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── interfaces
│   │   └── App.tsx
│   └── package.json
├── controllers
├── models
├── routes
├── server.js
├── .env
├── package.json
└── README.md
```

---

## 🤝 **Contributing**

Contributions are welcome! Feel free to submit a pull request or open an issue if you find a bug or want to enhance the app.

---

## 📜 **License**

This project is licensed under the [MIT License](./LICENSE.md).
