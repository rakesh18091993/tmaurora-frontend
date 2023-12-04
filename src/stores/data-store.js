import { defineStore } from "pinia";
import axios from "axios";
import { serverIP, timeout } from "boot/globalVars.js";

function getAxiosConfig(headers = {}) {
  return {
    baseURL: serverIP + "/data/",
    timeout: timeout,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("vue-token"),
      ...headers,
    },
  };
}
export const useDataStore = defineStore("dataStore", {
  state: () => ({
    plantDetails: [],
    currentSite: {},
    currentSiteStatus: "unhealthy",
  }),
  getters: {},
  actions: {
    async fetchWidgetData(payload) {
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
