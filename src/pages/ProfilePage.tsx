import useSWR from 'swr';
interface ProfilePageProps {
    onLogout: () => void;
}


const ProfilePage = ({ onLogout }:ProfilePageProps ) => {
    const fetcher = (url: string) =>
        fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            },
        }).then((response) => response.json());


    const { data, error } = useSWR('http://localhost:3000/user/me', fetcher);
    if (error) {
        console.log('Error:', error);
    }
    if (!data) {
        return <p>loadig</p>;
    }
    console.log('autoriyace/token usera', localStorage.getItem('Authorization'));
    return (
        <div>
            <h2>user</h2>
            <p>email:{data.email}</p>
            <p>crated at: {data.createdAt}</p>
            <p>updated at: {data.updatedAt}</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};


export default ProfilePage;
