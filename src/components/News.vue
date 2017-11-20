<template>
  <!-- Example using a QLayout as required -->
  <q-layout ref="layout" view="hHr LpR Fff">
    <!-- Layout header -->
    <q-toolbar slot="header">
      <q-btn flat>
        <router-link to="/settings"><q-icon name="settings" /></router-link>
      </q-btn>
      <div class="q-toolbar-title">
        News Street
      </div>
       <q-btn flat>
        <router-link to="/search"><q-icon name="search" /></router-link>
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
  
  
    <q-carousel class="text-white article" v-touch-swipe.vertical="userHasSwiped">
      <div slot="slide" class="news" v-for="(article, articleIndex) in newsCollection" :key="articleIndex">
        <div class="article-image row justify-center items-center">
          <img v-lazy="article.urlToImage" :src="article.urlToImage" alt="" width="100%">
          <q-spinner-cube class="spinner" color="primary" :size="50" />
        </div>
        <div class="news-text">
          <h2>
            {{article.title}}
          </h2>
          <p>
          </p>
          <p>
            {{article.description}}
          </p>
        </div>
      </div>
    </q-carousel>
  
  
    <!-- Page insertion point -->
    <div>
      <q-modal v-model="isReadMorePanelOpen" @open="notify('open')">
        <button @click="toggleReadMorePanel">close</button>
        <shimmer v-if="showShimmer"></shimmer>
      </q-modal>
    </div>
  
    <!-- Footer -->
    <news-footer /> 
  </q-layout>
</template>

<script>
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
  import {
    newsSourcetoApiString,
    openInAppBrowser
  } from '../utils/commonUtils';
  import {
    fetchNews,
    stringifyArray,
  } from "../network/requestNews";
  import VueLazyload from 'vue-lazyload';
  import Shimmer from '@/Shimmer.vue';
  import SideBarPanel from '@/SideBarPanel.vue'
  import NewsFooter from '@/NewsFooter.vue'
  Vue.use(VueLazyload);
  
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
      QCarousel,
      QSpinnerCube,
      QModal,
      Shimmer,
      SideBarPanel,
      NewsFooter
    },
     directives: {
        TouchSwipe
    },
    data() {
      return {
        opened: false,
        popUpContent: "",
        newsCollection: [],
        isPopupOpen: false,
        preLoader: true,
        openModal: false,
        showShimmer: false
      };
    },
    mounted() {
      let selectedLs = ["the-next-web", "techcrunch"];
      let transformed = newsSourcetoApiString(selectedLs);
      // TO DO - Convert to asycn await 
      // fetchNews(transformed).forEach(item => {
      //   item.then(data => this.newsCollection = [...this.newsCollection, ...data.articles]).then((data) => {
      //     this.preLoader = false;
      //     console.log("turning of preloader");
      //   });
      // });

      // let Stringified = stringifyArray(transformed)
      fetchNews(selectedLs).then(res => {
        this.newsCollection = res.articles;
      });
    },
    methods: {
      ...mapActions(['toggleReadMorePanel']),
      openWindow() {
        this.toggleReadMorePanel();
        try {
          if (cordova) {
            openInAppBrowser();
          }
        } catch (err) {
          console.log(err);
        }
      },
      notify() {
        this.showShimmer = true;
      },
      userHasSwiped(data){
        this.openWindow();
        console.log('swiped', data)
      },
      cordovaShare(shareDetails) {
        console.log({
          shareDetails
        });
        const {
          description,
          title,
          url,
          urlToImage
        } = shareDetails;
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
          message: `${title}
                  
                  ${description}` || null, // not supported on some apps (Facebook, Instagram)
          subject: title, // fi. for email
          files: null, // an array of filenames either locally or remotely
          url: url || null,
          chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
        }
  
        var onSuccess = function(result) {
          console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
          console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }
  
        var onError = function(msg) {
          console.log("Sharing failed with message: " + msg);
        }
  
        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
      }
    },
    computed: {
      ...mapState({
        isReadMorePanelOpen: state => state.app.isReadMorePanelOpen,
      }),
    }
  };
</script>

<style lang="scss" scoped>
  .article {
    width: 100vw;
    background: white;
    height: calc(100vh - 100px);
    overflow: hidden;
  }
  
  .news {
    width: 100%;
    padding: 0;
    overflow: hidden;
    .article-image {
      position: relative;
      width: 100%;
      padding: 0;
      background: linear-gradient(to bottom, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
    }
    .spinner {
      position: absolute;
    }
    img {
      opacity: 0;
      width: 100%;
      height: 250px;
      display: inline-block;
      transition: opacity 1s ease;
    }
    .news-text {
      padding: 1rem;
    }
    img[lazy=loading] {
      background: black;
    }
    img[lazy=loaded] {
      opacity: 1
    }
    img[lazy=loaded]+.spinner {
      display: none;
    }
  }
</style>
