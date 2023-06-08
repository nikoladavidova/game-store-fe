
import { useState } from 'react';
interface RegisterProps{
    onRegisterSuccess:()=> void;
}




const RegistrationPage= ({ onRegisterSuccess: onRegisterSuccess }:RegisterProps) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });


            if (response.ok) {
                onRegisterSuccess();
                console.log("registrovaalo se")
            } else {
                console.log("fail")
            }
        } catch (error) {
            console.log("error",error)
        }
    };


    return (
        <div>
            <form onSubmit={handleRegistration}>
                <label>
                    <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}
                           className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"  />
                </label>
                <br />
                <label>
                    <input type="email" placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)}
                           className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"/>
                </label>
                <br />
                <label>
                    <input type="password" placeholder="heslo" value={password} onChange={(e) => setPassword(e.target.value)}
                           className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"/>
                </label>
                <br />
                <div className="bg-gray-200 m-1.5 py-2.5 px-6 text-center text-2xl font-semibold rounded-full">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};


export default RegistrationPage;
