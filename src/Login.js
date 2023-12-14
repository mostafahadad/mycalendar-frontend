import React from 'react';
import { useKeycloak } from "@react-keycloak/web";

const LoginPage = () => {
    const { keycloak} = useKeycloak();

    const handleLogin = () => {
        keycloak.login();
    };

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;