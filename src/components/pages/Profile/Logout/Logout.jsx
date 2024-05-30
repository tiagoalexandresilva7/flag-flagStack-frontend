import { useLocation } from 'wouter';
import authService from '../../../../../services/authService';

function Logout() {
    const [location, setLocation] = useLocation();

    function logoutButtonHandler() {
        const response = authService.logoutUser();

        if (!response) {
            return;
        }

        setLocation('/');
    }

    return <button onClick={logoutButtonHandler}>Log out</button>;
}

export default Logout;
