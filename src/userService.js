export const addUserToDatabase = (keycloak) => {
    const userDetails = keycloak.tokenParsed;

    return fetch(`https://localhost:7013/api/user/${userDetails.sub}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${keycloak.token}`
        }
    })
    .then(response => {
        if (response.status === 404) {
            // User not found, try to create the user
            return fetch('https://localhost:7013/api/user', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error occurred while adding user');
                }
                return { userAdded: true, data: response.json() };
            });
        } 
        else if (response.status === 200) {
            // User already exists
            return { userAdded: false, data: response.json() };
        } 
            else {
                // Handle other non-OK responses
                throw new Error('Error occurred while checking user');
            }
    });
};
