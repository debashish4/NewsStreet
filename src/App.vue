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
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
  
      </q-toolbar>
  
      <!--
                                        Defining left side of QLayout.
                                        Notice slot="left"
                                      -->
      <div slot="left">
        <q-side-link item to="/test-layout" exact>
          <q-item-main label="About" />
        </q-side-link>
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
      return {
  
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
