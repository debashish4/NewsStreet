<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <!-- Example using a QLayout as required -->
    <q-layout ref="layout" view="hHr LpR Fff">
      <!-- Layout header -->
      <q-toolbar slot="header">
        <q-btn flat>
          <router-link to="/settings">
            <q-icon name="settings" /></router-link>
        </q-btn>
        <div class="q-toolbar-title">
          News Street
        </div>
        <q-btn flat>
          <router-link to="/search">
            <q-icon name="search" /></router-link>
        </q-btn>
        <q-btn flat @click="openLeftDrawer">
          <q-icon name="menu" />
        </q-btn>
  
      </q-toolbar>
  
      <div slot="left">
        <side-bar-panel />
      </div>
      <router-view />
      <q-modal v-model="appExitConfirm" minimized>
        <p>
          Do you want to exit ?
        </p>
        <q-btn icon="create" @click="exitFromApp">Yes</q-btn>
        <q-btn icon="create" class="primary">No</q-btn>
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
    stopInAppBrowser
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
  import News from '@/News.vue'
  import SideBarPanel from '@/SideBarPanel.vue'
  
  export default {
    name: 'App',
    data() {
      return {
      appExitConfirm: false
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
      // onBackKeyDown();
      document.addEventListener("backbutton", onBackKeyDown, false);
  
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
      }
    },
    watch: {
      isDrawerOpen: function(data) {
        data ? this.openLeftDrawer() : this.closeLeftDrawer()
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
      SideBarPanel
    }
  }
</script>

<style>
  
</style>
