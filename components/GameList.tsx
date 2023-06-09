import React, { useState, useEffect } from 'react';
import GameDetails from "./GameDetails";
import GenresPage from "./GenresPage";

interface GameProps {
    name: string;
    description: string;
    price: number;
    sale: number;
    publisher: string;
    developer: string;
    releaseDate: string;
    genres: GenresProps[];
    id: string;
}

interface GenresProps{
    id: "string";
    name: "string";
}

export default function GameList() {
    const [games, setGames] = useState<GameProps[]>([]);
    const [openGame, setOpenGame] = useState<GameProps | null>(null);
    const [gameGenres,setGameGenres]= useState<GenresProps[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:3000/games', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                    },
                });


                if (response.ok) {
                    const gamesData: GameProps[] = await response.json();
                    setGames(gamesData);
                    console.log(gamesData);
                } else {
                    console.log('fail');
                }
            } catch (error) {
                console.log(error);
            }
        };


        fetchGames();
    }, []);



    const handleSeeDetails = (game: GameProps) => {
        setOpenGame(game);


    };


    const handleExitDetails = () => {
        setOpenGame(null);
    };


    const handleDeleteGame = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/games/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                },
            });

            if (response.ok) {

                setGames((prevGames: GameProps[]) =>
                    prevGames.filter((game: GameProps) => game.id !== id)
                );
                setOpenGame(null);
                console.log("deleted"); } else {

                console.log('fail delete');
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleSaveGame = (editedGame: GameProps) => {
        const isExistingGame = games.some((game) => game.id === editedGame.id);

        if (isExistingGame) {
            const updatedGames = games.map((game) => {
                if (game.id === editedGame.id) {
                    return editedGame;
                }
                return game;
            });
            setGames(updatedGames);
        } else {
            setGames((prevGames) => [...prevGames, editedGame]);
        }
    };


    return (
        <div>
            {games.map((game) => (
                <div key={game.id} className="content-center bg-blue-200 w-1/5 h-32 inline-block m-10 p-5">
                    <h2 className="flex items-center justify-center">{game.name}</h2>
                    <p className="flex items-center justify-center">{game.description}</p>
                    <p className="flex items-center justify-center">{game.sale}</p>
                    <button onClick={() => handleSeeDetails(game)}>Details</button>
                </div>
            ))}


            {openGame && (
                <GameDetails
                    game={openGame}
                    onExitDetails={handleExitDetails}
                    onDeleteGame={handleDeleteGame}
                    onSaveGame={handleSaveGame}
                />
            )}
        </div>
    );
}
