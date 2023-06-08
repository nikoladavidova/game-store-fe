import React, { useState, useEffect } from 'react';

export async function fetchGenres() {
    try {
        const response = await fetch('http://localhost:3000/genres', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            },
        });

        if (response.ok) {
            const genresData: Genre[] = await response.json();
            return genresData;
        } else {
            console.log('Failed to fetch genres');
            return [];
        }
    } catch (error) {
        console.log('Error fetching genres:', error);
        return [];
    }
}

export async function createGenre(name: string) {
    try {
        const response = await fetch('http://localhost:3000/genres', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            const newGenre: Genre = await response.json();
            return newGenre;
        } else {
            console.log('Failed to create genre');
            return null;
        }
    } catch (error) {
        console.log('Error creating genre:', error);
        return null;
    }
}

export async function deleteGenre(id: string) {
    try {
        const response = await fetch(`http://localhost:3000/genres/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            },
        });

        if (response.ok) {
            return true;
        } else {
            console.log('Failed to delete genre');
            return false;
        }
    } catch (error) {
        console.log('Error deleting genre:', error);
        return false;
    }
}


interface Genre {
    id: string;
    name: string;
}

interface GenreFormProps {
    onGenreCreate: (genre: Genre) => void;
}

const GenreForm: React.FC<GenreFormProps> = ({ onGenreCreate }) => {
    const [genreName, setGenreName] = useState('');

    const handleGenreNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGenreName(event.target.value);
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const newGenre = await createGenre(genreName);
            if (newGenre) {
                onGenreCreate(newGenre);
                setGenreName('');
            }
        } catch (error) {
            console.log('Error creating genre:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder="Enter genre name"
                value={genreName}
                onChange={handleGenreNameChange}
            />
            <button type="submit">Create Genre</button>
        </form>
    );
};


interface GenreListProps {
    genres: Genre[];
    onGenreDelete: (id: string) => void;
}

const GenreList: React.FC<GenreListProps> = ({ genres, onGenreDelete }) => {
    const handleGenreDelete = (id: string) => {
        onGenreDelete(id);
    };

    return (
        <ul>
            {genres.map((genre) => (
                <li key={genre.id}>
                    {genre.name}
                    {genre.id}
                    <button onClick={() => handleGenreDelete(genre.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};


interface GenresPageProps {
    onAddGenre: (genreId: string) => void; // Add the onAddGenre prop here
}

const GenresPage: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);

    const fetchGenresData = async () => {
        try {
            const genresData = await fetchGenres();
            setGenres(genresData);
        } catch (error) {
            console.log('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        fetchGenresData();
    }, []);

    const handleGenreCreate = async (genre: Genre) => {
        setGenres((prevGenres) => [...prevGenres, genre]);
    };

    const handleGenreDelete = async (id: string) => {
        try {
            const success = await deleteGenre(id);
            if (success) {
                setGenres((prevGenres) => prevGenres.filter((genre) => genre.id !== id));
            }
        } catch (error) {
            console.log('Error deleting genre:', error);
        }
    };

    return (
        <div>
            <h1>Genres</h1>
            <GenreForm onGenreCreate={handleGenreCreate} />
            <GenreList genres={genres} onGenreDelete={handleGenreDelete} />
        </div>
    );
};


export default GenresPage;