import { useState } from 'react';
import useSWR from 'swr';

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




const CreateGame = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [sale, setSale] = useState(0);
    const [publisher, setPublisher] = useState('');
    const [developer, setDeveloper] = useState('');
    const [releaseDate, setReleaseDate] = useState('');


    const handleCreateGame = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    sale,
                    publisher,
                    developer,
                    releaseDate,
                    genres: [],
                }),
            });

            if (response.ok) {
                const game: GameProps = await response.json();
                console.log('yipyip vztvo5eno:', game);
            } else {
                console.log('fail nevztvo5lo se');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <form onSubmit={handleCreateGame} className="bg-yellow-200">
            <p>nazev</p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /><br/>
            <p>description</p>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}

            />
            <p>cena</p>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}

            /><br/>
            <p>sleva</p>
            <input
                type="number"
                value={sale}
                onChange={(e) => setSale(parseFloat(e.target.value))}

            />
            <p>publisher</p>
            <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}

            /><br/>
            <p>developer</p>
            <input
                type="text"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}

            /><br/>
            <p>datum ve formatu: 2023-05-23T13:49:17.678Z  </p>
            <input
                type="text"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}

            /><br/>
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateGame;

