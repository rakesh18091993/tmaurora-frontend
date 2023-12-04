import { defineStore } from "pinia";
import axios from "axios";
import { serverIP, timeout } from "boot/globalVars.js";

function getAxiosConfig(headers = {}) {
  return {
    baseURL: serverIP + "/ui/",
    timeout: timeout,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("vue-token"),
      ...headers,
    },
  };
}
export const useUiStore = defineStore("uiStore", {
  state: () => ({
    user: {},
    keycloak: {},
    userSettings: {},
  }),
  getters: {},
  actions: {
    async fetchData() {
      try {
        const response = await axios.get(payload.url, {
          params: payload.params,
          ...getAxiosConfig(),
        });
        return response.data;
      } catch (err) {
        console.log(error);
      }
    },
  },
});
