import VueKeyCloakJs from "@dsb-norge/vue-keycloak-js";
import axios from "axios";
import { keycloakConfig } from "boot/globalVars.js";

export default async ({ Vue, store }) => {
  function registerTokenInterceptor(keycloak) {
    axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${keycloak.token}`;

        return config;
        // S2554: Expected 0-2 arguments, but got 3.
      },
      null,
      { synchronous: true }
    );
  }

  return new Promise((resolve, reject) => {
    Vue.use(VueKeyCloakJs, {
      config: {
        url: keycloakConfig.url,
        realm: keycloakConfig.realm,
        clientId: keycloakConfig.clientId,
        // clientSecret: keycloakConfig.clientSecret,
      },
      init: {
        onLoad: "login-required",
        checkLoginIframe: false,
        responseMode: "fragment",
        // client_secret: 'HsRIcKsE6NTpOfwapLWfy4fg67HsXC3b',
        flow: "standard",
      },
      onReady: (keycloak) => {
        Vue.prototype.$kc = keycloak;
        // console.log(keycloak.tokenParsed);
        localStorage.setItem("vue-token", keycloak.token);
        Vue.prototype.$user = keycloak.tokenParsed;
        // store.commit("uistore/setUserObject", { ...keycloak.tokenParsed });
        // store.commit("uistore/setKeycloakObject", { ...keycloak });
        registerTokenInterceptor(keycloak);
        resolve();
      },
    });
  });
};
