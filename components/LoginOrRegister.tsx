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
                return (<div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                        <LoginPage onLoginSuccess={() => handleRedirectChange('ProfilePage')} />
                    </div>)

            case 'RegistrationPage':
                return(<div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                    <RegistrationPage onRegisterSuccess={() => handleRedirectChange('LoginPage')} />
                </div>)


            case 'ProfilePage':
                return (<div>
                    <ProfilePage onLogout={() => handleRedirectChange('default')} />;
                    </div>);
            default:
                return (
                    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                        <div className="flex flex-col text-2xl font-semibold p-10 border-8 border-gray-200 rounded-lg">

                        <div className="bg-gray-200 m-1.5 py-2.5 px-6 text-center  rounded-full">
                        <button onClick={() => handleRedirectChange('LoginPage')}>Login</button>
                    </div>
                        <div className="bg-gray-200 m-1.5 py-2.5 text-center  px-6 rounded-full">
                        <button onClick={() => handleRedirectChange('RegistrationPage')}>Register</button>
                        </div>
                    </div></div>
                );
        }
    };


    return <div>{Box()}</div>;
};


export default LoginOrRegister;
