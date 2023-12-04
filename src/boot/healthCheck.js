import { ref, onMounted } from "vue";
import { useDataStore } from "src/stores/data-store";
import { useUiStore } from "src/stores/ui-store";

export default ({ router, store, app }) => {
  const dataStore = useDataStore();
  const uiStore = useUiStore();
  const getPlantDetails = async () => {
    try {
      const response = await uiStore.fetchWidgetData({ url: "rolesandsites/" });

      const plantDetails = response.data.sites;
      dataStore.plantDetails = plantDetails;

      // Save sitemodel to local storage
      localStorage.setItem("selectedSite", JSON.stringify(plantDetails[0]));
      dataStore.currentSite = plantDetails[0];

      // Optionally, dispatch another action
      // store.dispatch("uistore/fetchUserSettings", { id: user.sub });
    } catch (error) {
      console.error("Error fetching plant details:", error);
    }
  };
  getPlantDetails();
  // Use the onMounted lifecycle hook to trigger the fetch after the component is mounted
};
