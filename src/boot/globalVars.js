import { createApp } from "vue";

// Global Variables
var backendURL = `http://127.0.0.1:8000`;
const apiTimeout = 20000;

// if (process.env.PROD) {
//   backendURL = `https://api.tmeic-ers.com`;
// }

// Keycloak Variables
const keycloakRealm = "ers";
var keycloakUrl = "https://tmidentity.tmeic.in";
var keycloakClientId = "ers-frontend";

// if (process.env.PROD) {
//   keycloakUrl = "https://tmeic-ers-auth.com:3000";
//   keycloakClientId = "ers";
// }

const app = createApp({});
app.config.globalProperties.$serverIP = backendURL;

export const serverIP = backendURL;
export const timeout = apiTimeout;

export const keycloakConfig = {
  url: keycloakUrl,
  realm: keycloakRealm,
  clientId: keycloakClientId,
};
