<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <div class="text-white text-bold text-italic text-h4 q-mr-md q-ml-sm">
          TMAurora
        </div>
        <div class="text-subtitle2 text-white">ver 00.01.42.20231201</div>
        <q-space />
        <q-select
          color="blue-12 no-wrap"
          dense
          v-model="siteModel"
          :options="plantDetails"
          map-options
          :label="$t('site.selectSite')"
          style="width: 380px"
          class="q-mr-xl"
          filled
          fill-input
          autocomplete="plantDetails"
          bg-color="white"
          option-label="s_name"
          option-value="s_plant_id"
          @input="changeSite"
        >
          <template v-slot:prepend>
            <q-icon name="location_on" color="green" />
          </template>
          <template #selected-item="{ opt }">
            <div class="selected-option" ref="selectedOptionRef">
              <span>{{ opt.s_name }}</span>
              <q-tooltip anchor="bottom middle">
                {{ opt.s_name }}
              </q-tooltip>
            </div>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <!-- <q-item-label v-html="scope.opt.s_name" /> -->
                <q-item-label overline class="text-bold">{{
                  scope.opt.s_name
                }}</q-item-label>
                <q-item-label caption>{{
                  scope.opt.s_customer_id
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-card flat square class="q-mr-md q-px-xs">
          <q-card-section class="column q-pa-none" align="center">
            <div>
              <q-icon
                size="20px"
                :color="siteStatus === 'healthy' ? 'green' : 'red'"
                name="notifications"
              >
              </q-icon>
            </div>
            <div>
              <span
                :style="{ color: siteStatus === 'healthy' ? 'green' : 'red' }"
              >
                {{
                  siteStatus === "healthy"
                    ? $t("B05.healthy")
                    : $t("B05.unHealthy")
                }}
              </span>
            </div>
          </q-card-section>
        </q-card>
        <q-select
          class="q-mx-md"
          @input="changeLocale"
          v-model="currentLocale"
          :options="localeOptions"
          :menu-offset="[20, 10]"
          dense
          rounded
          label-color="primary"
          hide-dropdown-icon
          emit-value
          hide-selected
          map-options
          options-dense
          borderless
        >
          <template v-slot:append>
            <q-btn icon="translate" color="white" flat dense class="q-mt-xs">
              <q-badge floating rounded align="top">{{
                currentLocale
              }}</q-badge>
            </q-btn>
          </template>
          <q-tooltip>{{ getLocaleLabel(currentLocale) }}</q-tooltip>
        </q-select>
        <q-btn color="grey" dense round class="q-ml-sm">
          <q-avatar
            ><span class="text-black">{{ userShortName }}</span></q-avatar
          >
          <q-popup-proxy v-model="profilePopup">
            <q-card>
              <div class="text-center" style="background-color: #1d3557">
                <q-icon
                  name="mdi-account-circle-outline"
                  color="white"
                  size="xl"
                />
                <div class="text-h5 text-white">
                  {{ $user.preferred_username }}
                </div>
                <q-separator />
              </div>
              <q-list dense bordered separator style="max-width: 318px">
                <q-item
                  clickable
                  @click="showUserProfile = true"
                  v-close-popup
                  v-ripple
                >
                  <q-item-section side avatar>
                    <q-icon name="las la-sliders-h" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{
                      $t("profilePopup.profileSettings")
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  to="users"
                  v-if="hasUserManagePermissions"
                  v-ripple
                >
                  <q-item-section side avatar>
                    <q-icon name="las la-users" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("profilePopup.manageUsers")
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section side avatar>
                    <q-icon name="las la-file-pdf" />
                  </q-item-section>
                  <q-item-section>{{
                    $t("profilePopup.systemGuidance")
                  }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="onLogout" v-ripple>
                  <q-item-section side avatar>
                    <q-icon color="red" name="las la-sign-out-alt" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-red">{{
                      $t("profilePopup.logOut")
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-popup-proxy>
        </q-btn>
        <!-- <q-btn icon="menu" color="white" flat>
          <q-menu :offset="[0, 9]">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                @click="this.$kc.accountManagement"
              >
                <q-item-section side avatar>
                  <q-icon name="person" color="blue" />
                </q-item-section>
                <q-item-section>Account</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="getPDF">
                <q-item-section side avatar>
                  <q-icon name="las la-file-pdf" />
                </q-item-section>
                <q-item-section>System Guidance</q-item-section>
              </q-item>
              <q-separator />
              <q-item
                clickable
                @click="showUserProfile = true"
                v-close-popup
                v-ripple
              >
                <q-item-section side avatar>
                  <q-icon name="las la-id-card" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>My Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                to="/users"
                v-if="hasUserManagePermissions"
                v-ripple
              >
                <q-item-section side avatar>
                  <q-icon name="las la-users" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Manage Users</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onLogout()">
                <q-item-section side avatar>
                  <q-icon name="logout" color="negative" />
                </q-item-section>
                <q-item-section class="text-negative">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn> -->
        <div class="q-mx-xs q-ml-lg">
          <q-icon name="calendar_today" />
          <span class="text-bold">: {{ current_date }}</span>
          <br />
          <q-icon name="schedule" />
          <span class="text-bold">: {{ current_time }}</span>
        </div>
        <div>
          <q-img
            class="q-ml-lg"
            contain
            src="/images/tmeic_logo_white.svg"
            width="100px"
            height="50px"
          />
        </div>
        <q-dialog
          v-model="pdfShow"
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <q-layout
            view="lHh Lpr lFf"
            container
            style="width: 1040px; max-width: 80vw; height: 1050px"
            class="rounded-borders"
          >
            <q-header elevated>
              <q-toolbar>
                <q-space />
                <q-btn
                  icon="close"
                  flat
                  round
                  dense
                  v-close-popup
                  class="justify-end items-end"
                />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <q-page>
                <VuePdfApp
                  :config="config"
                  theme="dark"
                  :pdf="pdfSrc"
                  ref="myPdfComponent"
                  style="height: 100vh"
                />
                <!-- place QPageScroller at end of page -->
                <q-page-scroller
                  position="bottom-right"
                  :scroll-offset="150"
                  :offset="[18, 18]"
                >
                  <q-btn fab icon="keyboard_arrow_up" color="primary"></q-btn>
                </q-page-scroller>
              </q-page>
            </q-page-container>
          </q-layout>
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      content-class=""
      :width="200"
      behavior="desktop"
      class="left-navigation text-black"
      side="left"
      bordered
      content-style="background-color: #f5f5f5"
    >
      <q-scroll-area class="fit">
        <appMenu />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <router-view id="page" />
      <q-page-sticky expand position="top">
        <WeatherKpi />
      </q-page-sticky>
    </q-page-container>
    <q-dialog v-model="showUserProfile">
      <userProfile />
    </q-dialog>
  </q-layout>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import WeatherKpi from "components/weather-kpi.vue";
import { mapGetters } from "vuex";
import { date } from "quasar";
import userProfile from "src/components/iam/userProfile.vue";
import appMenu from "src/components/app-menu/appMenu";
import { useDataStore } from "src/stores/data-store";
import { useUiStore } from "src/stores/ui-store";

export default {
  name: "MainLayout",
  components: {
    WeatherKpi,
    userProfile,
    appMenu,
  },
  setup() {
    onMounted(() => {
      getCurrentDateTime();
      setInterval(getCurrentDateTime, 1000);
    });

    watch(
      () => uiStore.userSettings,
      () => {
        currentLocale.value = uiStore.userSettings.language;
        appContext.$i18n.locale = currentLocale.value;
      }
    );
    const siteModel = ref("");
    const currentLocale = ref("en-US");
    const profilePopup = ref(false);
    const current_date = ref(null);
    const current_time = ref(null);

    const dataStore = useDataStore();
    const uiStore = useUiStore();

    const getCurrentDateTime = () => {
      const timeStamp = Date.now();
      current_date.value = date.formatDate(timeStamp, "YYYY/MM/DD");
      current_time.value = date.formatDate(timeStamp, "HH:mm:ss");
    };
    const getLocaleLabel = (value) => {
      const selectedLocale = this.localeOptions.find(
        (option) => option.value === value
      );
      return selectedLocale ? selectedLocale.label : "";
    };
    const changeLocale = () => {
      appContext.$i18n.locale = currentLocale.value;
      // $root.$emit("localeUpdated", currentLocale.value);
    };
    const changeSite = () => {
      dataStore.CurrentSite = siteModel.value;
    };
    const onLogout = () => {
      appContext.$kc.logout();
      localStorage.clear();
    };
  },
  created() {
    this.siteModel = this.$store.state.datastore.currentSite;
    this.$store.dispatch("uistore/fetchUserSettings", { id: this.$user.sub });
    this.$i18n.locale = this.currentLocale;
  },

  computed: {
    ...mapGetters({
      plantDetails: "datastore/getPlantDetails",
      currentSite: "datastore/getCurrentSite",
      userSettings: "uistore/getUserSettings",
      siteStatus: "datastore/getCurrentSiteStatus",
    }),
    userShortName() {
      return this.$user.preferred_username[0].toUpperCase();
    },
    hasUserManagePermissions() {
      if (this.$user.role) {
        return this.$user.role.includes("admin");
      }
      return false;
    },
    hasPageAccess() {
      return this.$user.role === "business-admin";
    },
    hasPVForecastingAccess() {
      return (
        this.$user.company === "yomeishu.co.jp" ||
        this.$user.role === "business-admin"
      );
    },
  },
  data() {
    return {
      current_date: null,
      current_time: null,
      showUserProfile: false,
      localeOptions: [
        {
          label: "English",
          value: "en-US",
        },
        {
          label: "日本語",
          value: "ja",
        },
      ],
      currentLocale: "en-US",
      siteModel: "",
      leftDrawerOpen: false,
      settingsMenu: false,
      testToggle: false,
      pdfShow: false,
      pdfSrc: "",
      config: {
        // pdf viewr config
        toolbar: {
          toolbarViewerLeft: {
            findbar: false,
          },
          toolbarViewerRight: {
            print: false,
            viewBookmark: false,
            openFile: false,
          },
          toolbarViewerMiddle: {
            scaleSelectContainer: false,
          },
        },
      },
      profilePopup: false,
    };
  },
  beforeUnmount() {
    clearInterval(this.second_interval);
  },
};
</script>
<style scoped>
.header_normal {
  background: linear-gradient(
    145deg,
    rgb(32, 106, 80) 15%,
    rgb(21, 57, 102) 70%
  );
}
.drawer_normal {
  background: linear-gradient(
    145deg,
    rgb(15, 82, 62) 15%,
    rgb(22, 28, 114) 70%
  );
}
.tab-active {
  background-color: rgba(76, 146, 179, 0.438);
}
.navigation-item {
  border-radius: 2px;
}
</style>
