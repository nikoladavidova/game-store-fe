import { useEffect, useState } from 'react';
import GenresPage from './GenresPage';
import { GenreSelection } from './GenresSelection';
import { GameProps, Genre } from './proptypes';

interface GameDetailsProps {
    game: GameProps;
    onExitDetails: () => void;
    onDeleteGame: (id: string) => void;
    onSaveGame: (editedGame: GameProps) => void;
    genres: Genre[];
}

const GameDetails: React.FC<GameDetailsProps> = ({game, onExitDetails, onDeleteGame, onSaveGame,}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedGame, setEditedGame] = useState<GameProps>(game);
    const [selectedGenres, setSelectedGenres] = useState<{ id: string; name: string }[]>([]);
const [genres, setGenres]=useState<Genre[]>([]);
    const handleDeleteGame = () => {
        onDeleteGame(game.id);
    };

    const handleEditFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberInputs = name === 'price' || name === 'sale' ? parseFloat(value) : value;

        setEditedGame((prevGame) => ({
            ...prevGame,
            [name]: numberInputs,}));};

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

    const handleEditClick = () => {
        setIsEditing(true);
        console.log(game);
    };

    const handleGenreSelect = (genre: { id: string; name: string }) => {
        setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
    };

    const handleGenreDeselect = (genreId: string) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.filter((genre) => genre.id !== genreId)
        );
    };

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

    if (isEditing) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-200">
                <h2>Edit Game</h2>
                <form key={editedGame.id}>
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
                            genres={genres}
                            selectedGenres={selectedGenres}
                            onGenreSelect={handleGenreSelect}
                            onGenreDeselect={handleGenreDeselect}
                        />
                    </div>
                    <button type="submit" onClick={handleSaveGame} className="bg-white font-semibold m-1.5 py-2.5 px-3 text-center  rounded-full">Save</button>
                    <button onClick={onExitDetails} className="bg-white font-semibold m-1.5 py-2.5 px-3 text-center  rounded-full">Cancel</button>
                </form>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white">
            <div className="content-center font-semibold border-8 border-gray-200 rounded-lg w-1/5 inline-block m-10 p-5">
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

            <button onClick={handleEditClick} className="bg-gray-200 m-1.5 py-2.5 px-3 text-center  rounded-full">Edit</button>
            <button onClick={handleDeleteGame} className="bg-gray-200 m-1.5 py-2.5 px-3 text-center  rounded-full">Delete</button>
            <button onClick={onExitDetails} className="bg-gray-200 m-1.5 py-2.5 px-3 text-center  rounded-full">Back</button>
        </div></div>
    );
};

export default GameDetails;


