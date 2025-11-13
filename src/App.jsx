import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Auth from "./components/Auth";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (!user) return <Auth />;

  return (
    <div className="app-container">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="main-content">
        
        <Header
          user={user}
          onLogout={handleLogout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <TaskBoard
          user={user}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
