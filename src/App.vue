<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" :class="{offline: isOffline}">
    <!-- Example using a QLayout as required -->
    <Loader />
    <q-layout ref="layout">
      <!-- Layout header -->
      <q-toolbar slot="header">
        <q-btn flat v-if="currentPath !== '/settings'">
          <router-link to="/settings">
            <q-icon name="settings" />
          </router-link>
        </q-btn>
        <q-btn class="back" v-else>
          <q-icon @click="goBack" name="keyboard arrow left" />
        </q-btn>
        <div class="q-toolbar-title">
          News Wave
        </div>
        <q-btn class="search-btn" flat>
          <router-link to="/search">
            <q-icon name="search" />
          </router-link>
        </q-btn>
        <q-btn class="menu-btn" flat @click="openLeftDrawer">
          <q-icon name="menu" />
        </q-btn>
  
      </q-toolbar>
  
      <div slot="left">
        <side-bar-panel />
      </div>
      <!-- Router View -->
      <!-- TO DO - add transition animation classes -->
      <transition>
        <router-view />
      </transition>
      <q-modal v-model="appExitConfirm" minimized>
        <p>
          Do you want to exit ?
        </p>
        <q-btn icon="create" @click="exitFromApp">Yes</q-btn>
        <q-btn icon="create" class="primary" @click="appExitConfirm = false">No</q-btn>
      </q-modal>
  
    </q-layout>
  </div>
</template>

<script>
  /*
   * Root component
   */
  import Vue from 'vue'
  import {
    mapActions,
    mapState
  } from 'vuex'
  import {
    stopInAppBrowser,
    disableOnContextMenu
  } from './utils/commonUtils'
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink,
    QCarousel,
    QSpinnerCube,
    QModal,
    TouchSwipe
  } from "quasar";
  import Loader from '@/Loader.vue'
  import News from '@/News.vue'
  import SideBarPanel from '@/SideBarPanel.vue'
  
  export default {
    name: 'App',
    data() {
      return {
        appExitConfirm: false,
        currentPath: '',
        isOffline: false
      }
    },
    mounted() {
      let self = this;
  
      function onBackKeyDown(e) {
        if (!self.isDrawerOpen && !self.isNewsListModalOpen && !self.isReadMorePanelOpen) {
          if (e) {
            e.preventDefault();
          }
          self.appExitConfirm = true;
        }
  
        if (self.isReadMorePanelOpen) {
          e.preventDefault();
          self.toggleReadMorePanel();
          stopInAppBrowser();
        } else if (self.isDrawerOpen) {
          self.closeNewsListModal();
          self.toggleDrawer();
        }
      }
  
      document.addEventListener("deviceready", onDeviceReady, false);
  
      function onDeviceReady() {
        // Now safe to use device APIs
        // onBackKeyDown();
        document.addEventListener("backbutton", onBackKeyDown, false);
  
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
  
        function onOnline() {
          self.isOffline = false;
        }
  
        function onOffline() {
          self.isOffline = true;
        }
      }
  
      disableOnContextMenu();
    },
    computed: {
      ...mapState({
        isDrawerOpen: state => state.app.isDrawerOpen,
        isNewsListModalOpen: state => state.app.isNewsListModalOpen,
        isReadMorePanelOpen: state => state.app.isReadMorePanelOpen
      })
    },
    methods: {
      ...mapActions(['toggleDrawer', 'openDrawer', 'toggleReadMorePanel', 'closeNewsListModal']),
      openLeftDrawer() {
        this.$refs.layout.showLeft();
        this.openDrawer();
      },
      closeLeftDrawer() {
        this.$refs.layout.hideLeft();
      },
      exitFromApp() {
        navigator.app.exitApp();
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    watch: {
      isDrawerOpen: function(data) {
        data ? this.openLeftDrawer() : this.closeLeftDrawer()
      },
      $route(route) {
        console.log('path', route.path);
        this.currentPath = route.path
      }
    },
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QSideLink,
      QCarousel,
      QSpinnerCube,
      QModal,
      TouchSwipe,
      News,
      SideBarPanel,
      Loader
    }
  }
</script>

<style lang="scss" scoped>
  .search-btn {
    background: #d23f50;
    padding: 0 1.5rem;
    border-radius: 0;
  }
  
  .menu-btn {
    margin: 0 0 0 1rem;
    padding: 0;
  }
  
  .offline {
    filter: blur(3px) grayscale(100%);
    pointer-events: none;
  }
</style>
