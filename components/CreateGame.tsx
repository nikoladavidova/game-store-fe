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

    const [show,setShow ] = useState(true);


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





    const handleShowHide=()=>{
        setShow(!show)
    }


    return (

        show ? <div className={"w-4/5 flex font-semibold"}>
            <button onClick={handleShowHide} className={"text-4xl"}>Create Game</button>
            </div>:
            <>
                <div className={"w-4/5 flex font-semibold"}>
                    <button onClick={handleShowHide} className={"text-4xl"}>Create Game</button>
                </div>
<div className={""}>

            <form onSubmit={handleCreateGame} className="font-semibold border-8 border-gray-200 rounded-lg w-2/3 p-3.5">

                <input
                    placeholder="nazev"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"
                />

                <input
                    placeholder="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"
                />
                <input
                    placeholder="cena"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"
                /><br/>
                <input
                    placeholder="sale"
                    type="number"
                    value={sale}
                    onChange={(e) => setSale(parseFloat(e.target.value))}
                    className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"
                />

                <input
                    placeholder="publisher"
                    type="text"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"
                />
                <input
                    placeholder="developer"
                    type="text"
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"
                />
                <p>datum ve formatu: 2023-05-23T13:49:17.678Z  </p>
                <input
                    placeholder="datum"
                    type="text"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"
                /><br/>
                <div className="bg-gray-200 m-1.5 py-2.5 px-6 text-center text-2xl font-semibold rounded-full">
                    <button type="submit">Create</button>
                </div>
            </form>
</div>
</>









    );
};

export default CreateGame;

