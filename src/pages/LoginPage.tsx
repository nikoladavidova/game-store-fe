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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
