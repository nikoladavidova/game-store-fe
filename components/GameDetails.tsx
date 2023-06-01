import {useEffect} from "react";
import {useState} from "react";

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

interface GameDetailsProps {
    game: GameProps;
    onExitDetails: () => void;
}

export default function GameDetails({ game, onExitDetails }: GameDetailsProps) {
    return (
        <div className="bg-green-300">
                <>
                    <h2>{game.name}</h2>
                    <p>{game.description}</p>
                    <p>{game.price}</p>
                    <button onClick={onExitDetails}>Exit Details</button>
                </>
        </div>
    );

}
