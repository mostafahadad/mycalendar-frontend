import MenuAppBar from "./MenuAppBar";
import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Calendar from "./Calendar";

const Home = () => {
    const {keycloak} = useKeycloak();
    const userDetails = keycloak.tokenParsed;
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7013/api/calendar/${userDetails.sub}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Data:', data);
                } else {
                    // Handle non-OK responses
                    const errorMessage = `Error occurred while fetching data. Status: ${response.status}`;
                    throw new Error(errorMessage);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, [keycloak.token, userDetails.sub]);

    return (
        <div>
            <MenuAppBar/>
            <Calendar events={events}
            />
        </div>
    )
}

export default Home;