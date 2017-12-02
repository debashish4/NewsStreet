<template>
  <q-layout ref="layout" view="hHr LpR Fff">
    <q-carousel class="text-white article" ref="newsCarousel" @slide="(index, direction) => slidePosition(index, direction)">
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
          <p class="read-full">
            Swipe Up to read the full story...
          </p>
          <!-- <wave /> -->
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
    TouchSwipe,
    Events
  } from "quasar"
  import VueLazyload from 'vue-lazyload'
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
        inAppBrowserLoadNewsUrl: '',
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
      });
      Events.$on('scrollToStart', (param1, param2) => {
         //start from 1st slide
        this.$refs.newsCarousel.goToSlide(0)
      })
    },
    methods: {
      ...mapActions(['toggleReadMorePanel', 'saveSocialShareData']),
      slidePosition(index, direction) {
        const {
          description,
          title,
          url,
          urlToImage
        } = this.newsCollection[index];
        this.saveSocialShareData({
          description,
          title,
          url,
          urlToImage
        })
      },
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
        if (evt.direction == "up" && evt.distance.y > 50) {
          this.inAppBrowserLoadNewsUrl = url
          this.openWindow();
        }
      },
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
    .read-full {
      font-size: 1.5rem;
      color: red;
    }
    img[lazy=loading] {
      opacity:1;
    }
    img[lazy=loaded] {
      opacity: 1
    }
    img[lazy=loaded]+.spinner {
      display: none;
    }
    img[lazy=error]{
      display:block;
      opacity:1;
      background: url('../assets/no_image_placeholder.png') no-repeat;
    }

    img[lazy=error]+.spinner {
      display: none;
      
    }
  }
</style>
