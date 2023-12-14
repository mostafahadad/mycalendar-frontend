import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8083/auth/",
    realm: "MyCalendar",
    clientId: "MyCalendar",
});

export default keycloak;