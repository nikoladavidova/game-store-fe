import { useState } from 'react';
import RegistrationPage from 'src/pages/RegistrationPage';
import LoginPage from 'src/pages/LoginPage';
import ProfilePage from 'src/pages/ProfilePage';


const LoginOrRegister= () => {
    const [redirect, setRedirect] = useState<string>('');
// cesta
    const handleRedirectChange = (newRoute: string) => {
        setRedirect(newRoute);
    };


    const Box = () => {
        switch (redirect) {
            case 'LoginPage':
                return <LoginPage onLoginSuccess={() => handleRedirectChange('ProfilePage')} />;
            case 'RegistrationPage':
                return <RegistrationPage onRegisterSuccess={() => handleRedirectChange('LoginPage')} />;
            case 'ProfilePage':
                return <ProfilePage onLogout={() => handleRedirectChange('default')} />;
            default:
                return (
                    <div>
                        <button onClick={() => handleRedirectChange('LoginPage')}>Login</button>
                        <button onClick={() => handleRedirectChange('RegistrationPage')}>Register</button>
                    </div>
                );
        }
    };


    return <div>{Box()}</div>;
};


export default LoginOrRegister;
