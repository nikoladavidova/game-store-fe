import React, { useState, useEffect } from 'react';
import GameDetails from "./GameDetails";
import GenresPage from "./GenresPage";

import {GenreSelection} from "./GenresSelection";
import {GameProps, Genre} from "./types";
interface GameListProps{
    games: GameProps[];
    genres: Genre[];

}
const GameList: React.FC<GameListProps> = ({ games, genres }) => {
    const [openGame, setOpenGame] = useState<GameProps | null>(null);
    const [fetchedGames, setFetchedGames] = useState<GameProps[]>([]);

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
                    setFetchedGames(gamesData);
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
                setFetchedGames((prevGames: GameProps[]) =>
                    prevGames.filter((game: GameProps) => game.id !== id)
                );
                setOpenGame(null);
                console.log('deleted');
            } else {
                console.log('fail delete');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveGame = (editedGame: GameProps) => {
        const isExistingGame = fetchedGames.some((game) => game.id === editedGame.id);

        if (isExistingGame) {
            const updatedGames = fetchedGames.map((game) => {
                if (game.id === editedGame.id) {
                    return editedGame;
                }
                return game;
            });
            setFetchedGames(updatedGames);
        } else {
            setFetchedGames((prevGames) => [...prevGames, editedGame]);
        }
    };

    return (
        <div>
            {fetchedGames.map((game) => (
                <div key={game.id} className="content-center font-semibold border-8 border-gray-200 rounded-lg w-1/5 h-32 inline-block m-10 p-5">
                    <h2 className="flex items-center justify-center">{game.name}</h2>
                    <p className="flex items-center justify-center"><p>description</p>p{game.description}</p>
                    <button onClick={() => handleSeeDetails(game)}>Details</button>
                </div>
            ))}

            {openGame && (
                <GameDetails
                    game={openGame}
                    onExitDetails={handleExitDetails}
                    onDeleteGame={handleDeleteGame}
                    onSaveGame={handleSaveGame}
                    genres={genres}
                />

            )}
        </div>
    );
};

export default GameList;