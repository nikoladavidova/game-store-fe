import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LoginPage from "@/pages/LoginPage";
import CreateGame from "../../components/CreateGame";
import {useState} from "react";
import LoginOrRegister from "components/LoginOrRegister";

export default function App() {

  return <>
  <CreateGame/>
  </>

}
/*<LoginOrRegister/>*/