<template>
  <!-- Example using a QLayout as required -->
  <q-layout ref="layout" view="hHr LpR Fff">
    <!-- Layout header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <div class="q-toolbar-title">
        News Street
      </div>
    </q-toolbar>
    <!--
                    Defining left side of QLayout.
                    Notice slot="left"
                  -->
    <div slot="left">
      <q-side-link item to="/test-layout" exact>
        <q-item-main label="About" />
      </q-side-link>
      <q-side-link item to="/test-layout/toolbar">
        <q-item-main label="Toolbar" />
      </q-side-link>
    </div>
  
  
    <q-carousel :dots="true" class="text-white article">
      <div slot="slide" class="news" v-for="(article, articleIndex) in newsCollection" :key="articleIndex">
        <p>
          {{article.title}}
        </p>
        <p>
          <img :src="article.urlToImage" alt="" width="100%">
        </p>
        <p>
          DESCRIPTION {{article.description}}
        </p>
      </div>
    </q-carousel>
  
  
    <!-- Page insertion point -->
    <router-view></router-view>
  
  
    <!-- Footer -->
    <q-toolbar slot="footer">
      <q-toolbar-title>
        Layout Footer
      </q-toolbar-title>
    </q-toolbar>
  </q-layout>
</template>

<script>
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
    QCarousel
  } from "quasar";
  import {
    newsSourcetoApiString
  } from '../utils/commonUtils';
  import {
    fetchNews
  } from "../network/requestNews";
  
  export default {
    name: "News",
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
      QCarousel
    },
    data() {
      return {
        opened: false,
        popUpContent: "",
        newsCollection: [],
        isPopupOpen: false,
        preLoader: true
      };
    },
    mounted() {
      let selectedLs = ["the-next-web", "techcrunch"];
      let transformed = newsSourcetoApiString(selectedLs);
      // TO DO - Convert to asycn await 
      fetchNews(transformed).forEach(item => {
        item.then(data => this.newsCollection = [...this.newsCollection, ...data.articles]).then((data) => {
          this.preLoader = false;
          console.log("turning of preloader");
          console.log('newsCollection', this.newsCollection);
        });
      });
    }
  };
</script>

<style scoped>
  .article {
    width: 100vw;
    background: purple;
    height: calc(100vh - 100px);
    overflow: hidden;
  }
  
  .news {
    width: 100%;
    padding: 1rem;
    overflow: hidden;
  }
</style>
