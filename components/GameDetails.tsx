import { useEffect, useState, ChangeEvent } from 'react';

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

export default function GameDetails() {
    const [id, setId] = useState<string>('');
    const [game, setGame] = useState<GameProps | null>(null);

    useEffect(() => {
        if (id) {
            const fetchGameDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/games/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                        },
                    });

                    if (response.ok) {
                        const gameData: GameProps = await response.json();
                        setGame(gameData);
                        console.log('detaily', gameData);
                    } else {
                        console.log('fail detaily');
                    }
                } catch (error) {
                    console.log('error detailz', error);
                }
            };

            fetchGameDetails();
        }
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    };

    if (!game) {
        return (
            <div>
                <p>id nap5 23d432b4-30f5-4c23-aa22-3598f2e93052 </p>
                <input type="text" value={id} onChange={handleInputChange} />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <p>id nap5 23d432b4-30f5-4c23-aa22-3598f2e93052 </p>
            <input type="text" value={id} onChange={handleInputChange} />
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <p>{game.price}</p>
        </div>
    );
}

