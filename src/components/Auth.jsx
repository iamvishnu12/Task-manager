import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Auth.css";

export default function Auth(){
  const [isLogin,setIsLogin] = useState(true);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try{
      if(isLogin){
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    }catch(err){ alert(err.message); }
  };

  const handleGoogle = async () => {
    try{
      await signInWithPopup(auth, provider);
    }catch(err){ alert(err.message); }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome back" : "Create account"}</h2>

        <button className="auth-btn auth-google" onClick={handleGoogle}>
          <span>Continue with Google</span>
        </button>

        <form onSubmit={handleEmailSubmit} className="auth-form">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
          <button className="auth-btn auth-primary" type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p className="auth-footer">
          <span className="auth-link" onClick={()=>setIsLogin(s=>!s)}>
            {isLogin ? "Create an account" : "Back to login"}
          </span>
        </p>
      </div>
    </div>
  );
}
