<template>
  <!-- Example using a QLayout as required -->
  <q-layout ref="layout" view="hHr LpR Fff">
  
    <q-carousel class="text-white article">
      <div slot="slide" class="news" v-for="(article, articleIndex) in newsCollection" :key="articleIndex" v-touch-swipe.vertical="(evt) => loadNewsInBrowser(article.url, evt)">
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
          <!-- <wave /> -->
        </div>
        <button @click="cordovaShare({title: article.title,description:article.description, url:article.url})">Share</button>
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
  } from "quasar"
  import {
    newsSourcetoApiString,
    openInAppBrowser
  } from '../utils/commonUtils'
  import {
    eventBus
  } from '../utils/eventBus'
  import {
    fetchNews,
    stringifyArray,
  } from "../network/requestNews"
  import VueLazyload from 'vue-lazyload'
  import Shimmer from '@/Shimmer.vue'
  // import Wave from '@/Wave.vue'
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
      NewsFooter,
      // Wave
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
        showShimmer: false,
        inAppBrowserLoadNewsUrl: ''
      };
    },
    mounted() {
      let selectedLs = ["the-next-web", "techcrunch"];
      // let transformed = newsSourcetoApiString(selectedLs);
      let loadNews = () => {
        console.log('selectedNews', this.selectedNews);
        console.log('selectedLs', selectedLs);
        if (this.selectedNews.length) {
          selectedLs = this.selectedNews.map((item) => item.id);
          console.log('abc', this.selectedNews);
        }
        fetchNews(selectedLs).then(res => {
          this.newsCollection = res.articles;
        });
      }
      loadNews();
      eventBus.$on('loadNews', (data) => {
        console.log('i received on', data)
        loadNews()
      })
  
  
    },
    methods: {
      ...mapActions(['toggleReadMorePanel']),
      openWindow() {
        this.toggleReadMorePanel();
        try {
          if (cordova) {
            let url = this.inAppBrowserLoadNewsUrl;
            console.log({
              url
            });
            openInAppBrowser(url);
          }
        } catch (err) {
          console.log(err);
        }
      },
      notify() {
        this.showShimmer = true;
      },
      loadNewsInBrowser(url, evt) {
        console.log('swiped', url);
        console.log('event', evt);
        if(evt.direction == "up"){
          this.inAppBrowserLoadNewsUrl = url
          this.openWindow();
        }
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
                      
      ${description}
      
      Read More: ` || null, // not supported on some apps (Facebook, Instagram)
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
        try {
          window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        } catch (err) {
          console.log(err);
        }
      }
    },
    computed: {
      ...mapState({
        isReadMorePanelOpen: state => state.app.isReadMorePanelOpen,
        selectedNews: state => state.news.selectedNews || ["the-next-web", "techcrunch"]
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
