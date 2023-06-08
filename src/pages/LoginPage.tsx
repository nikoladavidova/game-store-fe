import { useState } from 'react';

interface LoginPageProps {
    onLoginSuccess: (Authorization: string) => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { Authorization } = await response.json();
                localStorage.setItem('Authorization', Authorization);
                onLoginSuccess(Authorization);
                console.log("yipyip")
            } else {

                console.log("fail");
            }
        } catch (error) {

            console.log('error:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                placeholder="e-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"/> <br/>
            <input
                placeholder="heslo"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 m-3 rounded-lg p-1.5 placeholder-gray-400"/><br/>
            <div className="bg-gray-200 m-1.5 py-2.5 px-6 text-center text-2xl font-semibold rounded-full">
            <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default LoginPage;
