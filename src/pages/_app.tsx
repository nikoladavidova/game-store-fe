import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LoginPage from "@/pages/LoginPage";
import CreateGame from "../../components/CreateGame";
import GameList from "../../components/GameList";
import GameDetails from "../../components/GameDetails";
import {useState} from "react";
import LoginOrRegister from "components/LoginOrRegister";

export default function App() {

  return <>
  <CreateGame/>
    <GameList/>
    <GameDetails id={""} description={""} developer={""} genres={[]} name={""} price={0} publisher={""} releaseDate={""} sale={0}/>
  </>

}
/*<LoginOrRegister/>*/