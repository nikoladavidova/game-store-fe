import React, {useEffect, useState} from 'react';
import GenresPage from "./GenresPage";


interface GameProps {
    name: string;
    description: string;
    price: number;
    sale: number;
    publisher: string;
    developer: string;
    releaseDate: string;
    genres: Genres[];
    id: string;
}

interface Genres{
    id: "string";
    name: "string";
}


interface GameDetailsProps {
    game: GameProps;
    onExitDetails: () => void;
    onDeleteGame: (id: string) => void;
    onSaveGame: (editedGame: GameProps) => void;
}


const GameDetails: React.FC<GameDetailsProps> = ({ game, onExitDetails, onDeleteGame, onSaveGame }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedGame, setEditedGame] = useState<GameProps>(game);
const [openGame, setOpenGame] = useState<GameProps>(game);
    useEffect(() => {

        const fetchGame= async () => {
            try {
                const response = await fetch('http://localhost:3000/games/${openGame.id}', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                    },
                });


                if (response.ok) {
                    const gamesData: GameProps[] = await response.json();
                    setOpenGame(openGame);
                    console.log(openGame);
                    console.log('yesssssssssssssssss')
                } else {
                    console.log('fail GET game');
                }
            } catch (error) {
                console.log(error);
            }
        };



        fetchGame();
    }, []);




    const handleEditFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberInputs = name === 'price' || name === 'sale' ? parseFloat(value) : value;

        setEditedGame({
            ...editedGame,
            [name]: numberInputs,
        });
    };
    const handleDeleteGame = () => {
        onDeleteGame(game.id);
    };
    /*mzs savenuti*/
    const handleSaveGame = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/games/${editedGame.id}`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                },
                body: JSON.stringify(editedGame),
            });

            if (response.ok) {
                const updatedGame: GameProps = await response.json();
                onSaveGame(updatedGame);
                setIsEditing(false);
            } else {
                console.log('fail PUT');
            }
        } catch (error) {
            console.log( error);
        }
        console.log(editedGame);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    if (isEditing) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-green-300">
                <h2>Edit Game</h2>
                <form key={editedGame.id}>
                    <label>
                        nayev
                        <input
                            type="text"
                            name="name"
                            value={editedGame.name}
                            onChange={handleEditFieldChange}
                        />
                    </label>
                    <label>
                        description
                        <input
                            type="text"
                            name="description"
                            value={editedGame.description}
                            onChange={handleEditFieldChange}
                        />
                    </label>
                    <label>
                        price
                        <input
                            type="number"
                            name="price"
                            value={editedGame.price}
                            onChange={handleEditFieldChange}
                        />
                    </label>
                    <label>
                        Sale:
                        <input
                            type="number"
                            name="sale"
                            value={editedGame.sale}
                            onChange={handleEditFieldChange}
                        />
                    </label>
                    <label>
                        publisher
                        <input
                            type="text"
                            name="publisher"
                            value={editedGame.publisher}
                            onChange={handleEditFieldChange}
                        />
                    </label>
                    <label>
                        developer
                        <input
                            type="text"
                            name="developer"
                            value={editedGame.developer}
                            onChange={handleEditFieldChange}
                        />
                    </label>
                    <label>
                        datum
                        <input
                            type="text"
                            name="releaseDate"
                            value={editedGame.releaseDate}
                            onChange={handleEditFieldChange}
                        />
                    </label>





                    <button onClick={handleSaveGame}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-green-300">

                        <div key={game.id} className="content-center bg-blue-200 w-1/5 h-32 inline-block m-10 p-5">
                            <h2 className="flex items-center justify-center">{game.name}</h2>
                            <h2 className="flex items-center justify-center">{game.description}</h2>
                            <p className="flex items-center justify-center">{game.developer}</p>
                            <p className="flex items-center justify-center">{game.price}</p>
                            <p className="flex items-center justify-center">{game.sale}</p>

                        </div>

                <button onClick={handleDeleteGame}>Delete</button>
                <button onClick={onExitDetails}>Exit Details</button>
                <button onClick={handleEditClick}>Edit</button>

        </div>
    );
};

export default GameDetails;

