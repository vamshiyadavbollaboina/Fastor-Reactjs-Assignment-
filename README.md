# 🍽️ Fastor React.js Restaurant Finder

## 📋 Overview

This project is a **React.js application** that displays a list of nearby restaurants fetched from an API.
It simulates a simple **login–OTP authentication flow** and showcases restaurant details including images, ratings, and cuisines.
Each restaurant card includes a **draggable Fastor logo** centered on the image for branding.

---

## 🚀 Features

* 🍴 **Restaurant list and detailed view**
* 🧭 **Routing** using React Router (Login → OTP → Restaurant List → Restaurant Detail)
* 🖼️ **Image overlay** with draggable Fastor logo
* ⏳ **Loading spinner** using `react-loader-spinner
* 🔁 **Logout functionality** with localStorage management

---

## 🧰 Tech Stack

* **React.js**
* **React Router DOM**
* **React Icons**
* **React Loader Spinner**
* **CSS (Component-specific styles)**

---

## 📦 Folder Structure

```
src/
│
├── api/
│   └── apiService.js         
│
├── components/
│   ├── Login/                
│   ├── Otp/                  
│   ├── RestaurantList/       
│   ├── RestaurantDetail/     
│   ├── ProtectedRoute/       
│
├── App.js                    
└── index.js                 
```

---

## ⚙️ Installation and Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/fastor-react-app.git
   ```
2. Navigate to the project folder:

   ```bash
   cd fastor-react-app
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the development server:

   ```bash
   npm start
   ```
---

## 🧭 Navigation Flow

1. **Login → OTP → Restaurant List → Restaurant Detail**
2. Logout resets authentication and redirects to login.

---

## 🧑‍💻 Author

**Bollaboina Vamshiyadav**

---
