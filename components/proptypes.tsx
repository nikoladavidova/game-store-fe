
export interface GameProps {
    name: string;
    description: string;
    price: number;
    sale: number;
    publisher: string;
    developer: string;
    releaseDate: string;
    genres: Genre[];
    id: string;
}


export interface Genre {
    id: string;
    name: string;
}