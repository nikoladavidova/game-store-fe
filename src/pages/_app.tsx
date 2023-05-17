import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LoginPage from "@/pages/autorizaceidk/LoginPage";
import {useState} from "react";

export default function App() {

  const [Logged, setLogged]=useState(false)
  //Authoriyation -token/key s value
  const handleLoginSuccess=(Authorization:string)=>{
    localStorage.setItem('Authorization',Authorization);
    setLogged(true)
  }
  const authorize=()=>{
   if (!Logged) {
     return <LoginPage onLoginSuccess={handleLoginSuccess}/>
   }
  }


  return <>
    {authorize()}</>
}
