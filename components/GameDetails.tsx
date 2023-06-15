import React, { useEffect, useState } from 'react';
import GenresPage from './GenresPage';


import {GenreSelection} from "./GenresSelection";
import {GameProps, Genre} from "./types";
interface GameDetailsProps {
    game: GameProps;
    onExitDetails: () => void;
    onDeleteGame: (id: string) => void;
    onSaveGame: (editedGame: GameProps) => void;
    genres: Genre[];
}


const GameDetails: React.FC<GameDetailsProps> = ({ game, onExitDetails, onDeleteGame, onSaveGame, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedGame, setEditedGame] = useState<GameProps>(game); //holds edited game object
    const [genreId, setGenreId] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<{ id: string; name: string }[]>([]);


    const [genres, setGenres] = useState<Genre[]>([]);
//
///genres fetching
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('http://localhost:3000/genres', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                    },
                });


                if (response.ok) {
                    const genresData: Genre[] = await response.json();
                    setGenres(genresData);
                } else {
                    console.log('Failed to fetch genres');
                }
            } catch (error) {
                console.log(error);
            }
        };


        fetchGenres();
    }, []);


//data from JSON jsou stored into editedgame a genres
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const [gameResponse] = await Promise.all([
                    fetch(`http://localhost:3000/games/${game.id}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                        },
                    }),
                ]);


                if (gameResponse.ok) {
                    const gameData: GameProps = await gameResponse.json();
                    setEditedGame(gameData);
                } else {
                    console.log('Failed to get game');
                }
            } catch (error) {
                console.log(error);
            }
        };
        console.log("Genres prop in GameDetails:", genres);


        fetchGame();
    }, [game.id]);


    const handleDeleteGame = () => {
        onDeleteGame(game.id);
    };


// A function that handles the change event of input fields used for editing game details. It updates the editedGame state by cloning the previous game object and updating the specific field that was changed.
    const handleEditFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberInputs = name === 'price' || name === 'sale' ? parseFloat(value) : value;


        setEditedGame((prevGame) => ({
            ...prevGame,
            [name]: numberInputs,
        }));
    };


//It prepares the updated game object, sends a PUT request to the server to update the game, and if successful, calls the onSaveGame function with the updated game data.
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
                console.log('Failed to update the game');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };








// sets the isEditing state to true, enabling the editing mode.
    const handleEditClick = () => {
        setIsEditing(true);
    };


//A function that sets the genreId state when adding a new genre to the game.
    const handleAddGenre = (genreId: string) => {
        setGenreId(genreId);
    };


//adds a new genre to the editedGame state when it is selected.






    const handleGenreSelect = (genre: { id: string; name: string }) => {
        setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
    };


    const handleGenreDeselect = (genreId: string) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.filter((genre) => genre.id !== genreId)
        );
    };


    if (isEditing) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-green-300">
                <h2>Edit Game</h2>
                <form key={editedGame.id}>
                    {/* Input fields for editing game details */}
                    <label>
                        Name:
                        <input type="text" name="name" value={editedGame.name} onChange={handleEditFieldChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={editedGame.description} onChange={handleEditFieldChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" value={editedGame.price} onChange={handleEditFieldChange} />
                    </label>
                    <label>
                        Sale:
                        <input type="number" name="sale" value={editedGame.sale} onChange={handleEditFieldChange} />
                    </label>
                    <label>
                        Publisher:
                        <input type="text" name="publisher" value={editedGame.publisher} onChange={handleEditFieldChange} />
                    </label>
                    <label>
                        Developer:
                        <input type="text" name="developer" value={editedGame.developer} onChange={handleEditFieldChange} />
                    </label>
                    <label>
                        Release Date:
                        <input
                            type="text"
                            name="releaseDate"
                            value={editedGame.releaseDate}
                            onChange={handleEditFieldChange}
                        />
                    </label>
                    <div>
                        Genres:
                        <GenreSelection
                            genres={genres} // Assuming you have a variable named 'genres' containing an array of Genre objects
                            selectedGenres={selectedGenres}
                            onGenreSelect={handleGenreSelect}
                            onGenreDeselect={handleGenreDeselect}
                        />
                    </div>


                    <button type="submit" onClick={handleSaveGame}>
                        Save
                    </button>
                    <button onClick={onExitDetails}>Cancel</button>
                </form>
            </div>
        );
    }
    console.log("Genres prop in GameDetails:1", genres);
    console.log(editedGame)
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-green-300">
            <h2>Game Details</h2>
            <p>Name: {game.name}</p>
            <p>Description: {game.description}</p>
            <p>Price: {game.price}</p>
            <p>Sale: {game.sale}</p>
            <p>Publisher: {game.publisher}</p>
            <p>Developer: {game.developer}</p>
            <p>Release Date: {game.releaseDate}</p>


            <p>
                Genres:
                {game.genres &&
                    game.genres.map((genre) => (
                        <span key={genre.id}>{genre.name} </span>
                    ))}
            </p>


            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteGame}>Delete</button>
            <button onClick={onExitDetails}>Back</button>
        </div>
    );
};








export default GameDetails;




