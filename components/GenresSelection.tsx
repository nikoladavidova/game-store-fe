import React from 'react';
import { Genre } from "./proptypes";

interface GenreSelectionProps {
    genres: Genre[];
    selectedGenres: { id: string; name: string }[];
    onGenreSelect: (genre: { id: string; name: string }) => void;
    onGenreDeselect: (genreId: string) => void;
}

export const GenreSelection: React.FC<GenreSelectionProps> = ({genres, selectedGenres, onGenreSelect, onGenreDeselect,}) => {
    const handleGenreToggle = (genre: { id: string; name: string }) => {
        const genreId = genre.id;
        if (selectedGenres.some((selectedGenre) => selectedGenre.id === genreId)) {
            onGenreDeselect(genreId);
        } else {
            onGenreSelect(genre);
        }
        console.log(selectedGenres)
    };

    return (
        <>
            {genres && genres.map((genre) => (
                <div key={genre.id}>
                    <input
                        type="checkbox"
                        id={genre.id}
                        checked={selectedGenres?.some((selectedGenre) => selectedGenre.id === genre.id)}
                        onChange={() => handleGenreToggle(genre)}
                    />
                    <label htmlFor={genre.id}>{genre.name}</label>
                </div>
            ))}
        </>
    );
};
