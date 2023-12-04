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
    async fetchWidgetData({ commit }, payload) {
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
    async fetchUserSettings({ commit }, payload) {
      try {
        const response = await axios.patch(
          `/usersettings/${payload.id}/`,
          payload.data,
          getAxiosConfig()
        );
        // commit("setUserSettings", response.data)
        return response.data;
      } catch (err) {
        console.log(error);
      }
    },
    async fetchUserSessions({ commit }) {
      const response = await axios.get("/user-sessions/", getAxiosConfig());
      return response.data;
    },
    async updateUserPassword({ commit }, payload) {
      const response = await axios.post(
        "/password-reset/",
        payload,
        getAxiosConfig()
      );
      return response.data;
    },
  },
});
