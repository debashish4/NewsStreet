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
        <q-btn flat @click="toggleDrawer">
          <q-icon name="menu" />
        </q-btn>
  
      </q-toolbar>
  
      <div slot="left">
        <side-bar-panel />
      </div>
      <router-view />
  
    </q-layout>
  </div>
</template>

<script>
  /*
   * Root component
   */
  import Vue from 'vue';
  import {
    mapActions,
    mapState
  } from 'vuex';
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
      return {}
    },
    computed: {
      ...mapState({
        isDrawerOpen: state => state.app.isDrawerOpen
      })
    },
    methods: {
      ...mapActions(['toggleDrawer']),
      openDrawer() {
        this.$refs.layout.showLeft();
      },
      closeDrawer() {
        this.$refs.layout.hideLeft();
      },
    },
    watch: {
      isDrawerOpen: function(data) {
        data ? this.openDrawer() : this.closeDrawer()
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
