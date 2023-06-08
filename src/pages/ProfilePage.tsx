import useSWR from 'swr';
import GameList from "../../components/GameList";
import CreateGame from "../../components/CreateGame";
import GameDetails from "../../components/GameDetails";
import GenresPage from "../../components/GenresPage";
import React, {useState} from "react";

interface ProfilePageProps {
    onLogout: () => void;
}


const ProfilePage = ({ onLogout }:ProfilePageProps ) => {
    const fetcher = (url: string) =>
        fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            },
        }).then((response) => response.json());


    const { data, error } = useSWR('http://localhost:3000/user/me', fetcher);
    if (error) {
        console.log('Error:', error);
    }
    if (!data) {
        return <p>loadig</p>;
    }
    console.log('autoriyace/token usera', localStorage.getItem('Authorization'));


    return (
        <div>

            <div className={"object-center inline-block bg-blue-50 w-1/5 float-right"}>
            <h2>user</h2>
            <p>email:{data.email}</p>
            <p>crated at: {data.createdAt}</p>
            <p>updated at: {data.updatedAt}</p>

              <div className={"flex items-center justify-center"}>
            <button onClick={onLogout} className={"self-center bg-green-300"}>Logout</button></div>

                <div className={"object-center inline-block bg-red-400 float-right"}>  <GenresPage /></div>
        </div>




<div className={"w-4/5 flex items-center justify-center text-4xl"}>HRY</div>

            <CreateGame/>

            <GameList/>


        </div>
    );
};


export default ProfilePage;
