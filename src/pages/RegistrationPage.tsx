
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
            <h2>registrace</h2>
            <form onSubmit={handleRegistration}>
                <label>
                    username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">register</button>
            </form>
        </div>
    );
};


export default RegistrationPage;
