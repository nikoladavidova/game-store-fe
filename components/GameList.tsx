import { useState, useEffect } from 'react';
import GameDetails from "./GameDetails";
interface GameProps {
    name: string;
    description: string;
    price: number;
    sale: number;
    publisher: string;
    developer: string;
    releaseDate: string;
    genres: string[];
    id: string;
}

export default function GameList() {
    const [games, setGames] = useState<GameProps[]>([]);
    const [chosenGame, setOpenGame] = useState<GameProps | null>(null);





    useEffect(() => {
        const fetchGames = async () => {
            try {


                const response = await fetch('http://localhost:3000/games', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                    },
                });

                if (response.ok) {
                    const gamesData: GameProps[] = await response.json();
                    setGames(gamesData);
                    console.log('yipyip vztvo5eno:', gamesData);
                } else {
                    console.log('fail');
                }
            } catch (error) {
                console.log('error', error);

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
    console.log(games);

    return (
        <div className="bg-blue-200">
            {games.map((game) => (
                <div key={game.id}>
                    <h2>{game.name}</h2>
                    <p>{game.description}</p>
                    <p>{game.price}</p>
                    <button onClick={() => handleSeeDetails(game)}>Details</button>

                </div>
            ))}

            {chosenGame && (
                <GameDetails game={chosenGame} onExitDetails={handleExitDetails} />
            )}
        </div>
    );
};
