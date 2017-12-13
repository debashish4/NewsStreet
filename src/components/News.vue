<template>
  <q-layout ref="layout" view="hHr LpR Fff">
    <!-- <q-carousel class="text-white article" ref="newsCarousel" @slide="(index, direction) => slidePosition(index, direction)">
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
              </div>
            </div>
          </q-carousel> -->
    <div class="flipWrapper" v-if="newsCollection.length">
      <div class="flip-container">
        <div class="flipper" :style="{ 'transform': `rotateY(${deg}deg)`}">
          <div class="front" v-touch-swipe.horizontal="frontCardSwipe">
            <div class="news">
              <div class="article-image row justify-center items-center">
                <img :src="newsCollection[front].urlToImage" alt="" width="100%">
                <!-- <q-spinner-cube class="spinner" color="primary" :size="50" /> -->
              </div>
              <div class="news-text">
                <h2>
                  <pre>{{front}}</pre>
                  {{newsCollection[front].title}}
                </h2>
                <p>
                </p>
                <p>
                  {{newsCollection[front].description}}
                </p>
                <p class="read-full">
                  Swipe Up to read the full story...
                </p>
              </div>
            </div>
          </div>
          <div class="back">
            <div class="news" v-touch-swipe.horizontal="backCardSwipe">
              <div class="article-image row justify-center items-center">
                <img :src="newsCollection[back].urlToImage" alt="" width="100%">
                <!-- <q-spinner-cube class="spinner" color="primary" :size="50" /> -->
              </div>
              <div class="news-text">
                <h2>
                  <pre>{{back}}</pre>
                  {{newsCollection[back].title}}
                </h2>
                <p>
                </p>
                <p>
                  {{newsCollection[back].description}}
                </p>
                <p class="read-full">
                  Swipe Up to read the full story...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
  
  
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
        deg: 0,
        front:0,
        back:1
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
        let newCarouselRef = this.$refs.newsCarousel;
        if (newCarouselRef) {
          newCarouselRef.goToSlide(0)
        }
      })
    },
    methods: {
      ...mapActions(['toggleReadMorePanel', 'saveSocialShareData']),
  
      frontCardSwipe(e) {
        console.log('front card swipe', this.front);
        if(this.front >= 0 || this.front <= (this.newsCollection.length-1)){
          if (e.direction == 'left') {
            console.log('left swipe on front card');
            this.deg -= 180;
            this.front = this.front+2;
          } else if(e.direction == 'right') {
            console.log('right swipe on front card');
            this.deg += 180;
            this.front = this.front-2;
            
          }
        }
      },
        backCardSwipe(e) {
        console.log('back card swipe');
        if(this.back >= 0 || this.back <= (this.newsCollection.length-1)){
          if (e.direction == 'left') {
            console.log('left swipe on backcard');
            this.deg -= 180;
            this.back = this.back+2;
          } else if(e.direction == 'right') {
            console.log('right swipe on backcard');
            this.deg += 180;
            this.back += this.back -2;
            
          }
        }
      },
  
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
  body{
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
      // opacity: 0;
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
    // img[lazy=loading] {
    //   opacity: 1;
    // }
    // img[lazy=loaded] {
    //   opacity: 1
    // }
    // img[lazy=loaded]+.spinner {
    //   display: none;
    // }
    // img[lazy=error] {
    //   display: block;
    //   opacity: 1;
    //   background: url('../assets/no_image_placeholder.png') no-repeat;
    // }
    // img[lazy=error]+.spinner {
    //   display: none;
    // }
  }
</style>
