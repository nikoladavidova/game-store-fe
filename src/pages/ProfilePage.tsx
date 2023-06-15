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

            <div className={"object-center inline-block w-1/5 float-right"}>
                <div className="object-center inline-block font-semibold p-2 border-8 border-gray-200 rounded-lg ">
            <h2>user</h2>
            <p>email:{data.email}</p>
            <p>crated at: {data.createdAt}</p>
            <p>updated at: {data.updatedAt}</p>

              <div className={"flex items-center justify-center"}>

            <button onClick={onLogout} className="self-center font-semibold bg-gray-200 m-1.5 py-2.5 px-3 text-center  rounded-full">Logout</button></div>
            </div>
                <div className="object-center float-right inline-block flex flex-col font-semibold p-4 border-8 border-gray-200 rounded-lg ">  <GenresPage /></div>
        </div>




<div className={"w-4/5 flex items-center justify-center text-4xl"}>HRY</div>

            <CreateGame/>

            <GameList/>


        </div>
    );
};


export default ProfilePage;
