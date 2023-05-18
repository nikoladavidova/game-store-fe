import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LoginPage from "@/pages/LoginPage";

import {useState} from "react";
import LoginOrRegister from "components/LoginOrRegister";

export default function App() {

  return <>
  <LoginOrRegister/>
  </>

}
