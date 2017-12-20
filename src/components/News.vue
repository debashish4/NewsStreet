<template>
  <q-layout ref="layout" view="hHr LpR Fff">
    <div class="flipWrapper" v-if="newsCollection.length">
      <div class="flip-container" :class="{'disable-touch': disableTouch}">
        <div class="flipper" :style="{ 'transform': `rotateY(${deg}deg)`}">
          <div class="front" v-touch-swipe.horizontal="frontCardSwipe">
            <div class="news">
              <div class="article-image-container row justify-center items-center">
                <img class="article-image" v-lazy="newsCollection[front].urlToImage" :src="newsCollection[front].urlToImage" alt="" width="100%">
                <q-spinner-cube class="spinner" color="red-8" :size="50" />
              </div>
              <div class="news-text">
                <h2>
                  {{newsCollection[front].title}}
                </h2>
                <p>
                </p>
                <p>
                  {{newsCollection[front].description}}
                </p>
              </div>
            </div>
          </div>
          <div class="back" v-touch-swipe.horizontal="backCardSwipe">
            <div class="news">
              <div class="article-image-container row justify-center items-center">
                <img class="article-image" v-lazy="newsCollection[back].urlToImage" :src="newsCollection[back].urlToImage" alt="" width="100%">
                <q-spinner-cube class="spinner" color="red-8" :size="50" />
              </div>
              <div class="news-text">
                <h2>
                  {{newsCollection[back].title}}
                </h2>
                <p>
                </p>
                <p>
                  {{newsCollection[back].description}}
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
    QSpinnerCube,
    QModal,
    TouchSwipe,
    Events,
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
      QSpinnerCube,
      QModal,
      Shimmer,
      SideBarPanel,
      NewsFooter,
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
        front: 0,
        back: 1,
        disableTouch: false,
        socialShareNewsItemIndex: 0
      };
    },
    mounted() {
      let selectedLs = ["the-next-web"];
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
          // this.socialShareNewsItemIndex = 0;
          const {
            description,
            title,
            url,
            urlToImage
          } = this.newsCollection[0];
          this.saveSocialShareData({
            description,
            title,
            url,
            urlToImage
          });
          eventBus.$emit('stopLoader');
          console.log('newsCollection', this.newsCollection);
        });
      }
      loadNews();
      eventBus.$on('loadNews', (data) => {
        console.log('i received on', data);
        loadNews()
      });
      Events.$on('moveTofirst', (param1, param2) => {
        //start from 1st slide
        this.deg= 0;
        this.front= 0;
        this.back= 1;
        this.socialShareNewsItemIndex = 0;
      })
    },
    methods: {
      ...mapActions(['toggleReadMorePanel', 'saveSocialShareData']),
      frontCardSwipe(e) {
        console.log('inside front if');
        this.disableTouch = true;
        let newsCollection = this.newsCollection;
        if (e.direction == 'left') {
          console.log('left swipe on front card');
          if (this.front < (newsCollection.length)) {
            if (newsCollection[this.front + 2]) {
              this.deg -= 180;
              setTimeout(_ => {
                this.front = this.front + 2;
                console.log('front', this.front);
              }, 200)
            } else {
              this.deg -= 180;
            }
          }
          if (this.socialShareNewsItemIndex < newsCollection.length) {
            this.socialShareNewsItemIndex++;
          }
        } else if (e.direction == 'right') {
          console.log('right swipe on front card');
          if (this.back >= 1) {
            if (newsCollection[this.back - 2]) {
              this.deg += 180;
              setTimeout(_ => {
                this.back = this.back - 2;
                console.log('back', this.back);
              }, 200)
            }
          }
          if (this.socialShareNewsItemIndex > 0) {
            this.socialShareNewsItemIndex--;
          }
        }
        setTimeout(() => {
          this.disableTouch = false;
        }, 500);
      },
      backCardSwipe(e) {
        // if (this.back >= 0 && this.back <= (this.newsCollection.length - 1)) {
  
        console.log('inside back if');
        this.disableTouch = true;
        let newsCollection = this.newsCollection;
        if (e.direction == 'left') {
          console.log('left swipe on backcard');
          if (this.back < (newsCollection.length)) {
            if (newsCollection[this.back + 2]) {
              this.deg -= 180;
              setTimeout(_ => {
                this.back = this.back + 2;
                console.log('back', this.back);
              }, 100)
            }
          }
          if (this.socialShareNewsItemIndex < newsCollection.length - 1) {
            this.socialShareNewsItemIndex++;
          }
        } else if (e.direction == 'right') {
          console.log('right swipe on backcard');
          if (this.front >= 0) {
            if (this.back == newsCollection.length - 1) {
              this.deg += 180;
  
            } else if (newsCollection[this.front - 2]) {
              this.deg += 180;
              setTimeout(_ => {
                this.front = this.front - 2;
                console.log('front', this.front);
              }, 100)
            } else {
              this.deg += 180;
            }
          }
          if (this.socialShareNewsItemIndex > 0) {
            this.socialShareNewsItemIndex--;
          }
        }
        setTimeout(() => {
          this.disableTouch = false;
        }, 400);
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
    },
    watch: {
      socialShareNewsItemIndex: function(newsIndex) {
        const {
          description = 'No Description Provided',
            title = "No Title Provided",
            url,
            urlToImage
        } = this.newsCollection[newsIndex];
        console.log('newsIndex', newsIndex);
        this.saveSocialShareData({
          description,
          title,
          url,
          urlToImage
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  /* entire container, keeps perspective */
  
  .disable-touch {
    pointer-events: none
  }
  
  .flipWrapper {
    background-image: url('../assets/egg-shell.png');
    .flip-container {
      -webkit-perspective: 2000px;
      perspective: 2000px;
      position: relative;
      z-index: 2000;
    }
    /* flip the pane when hovered */
    .flip-container.hover .flipper {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
    }
    .flip-container,
    .front,
    .back {
      width: 100vw;
      height: -webkit-calc(100vh - 10rem);
      height: calc(100vh - 10rem);
    }
    /* flip speed goes here */
    .flipper {
      -webkit-transition: 0.4s;
      transition: 0.4s;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      position: relative;
    }
    /* hide back of pane during swap */
    .front,
    .back {
      border-top: 0.4rem solid #d23f50;
      border-bottom: 0.4rem solid #ce2539;
      background: #ffffff;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }
    /* front pane, placed above back */
    .front {
      z-index: 2;
      /* for firefox 31 */
      -webkit-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }
    /* back, initially hidden pane */
    .back {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
    }
  }
  
  .article {
    width: 100vw;
    background: white;
    height: -webkit-calc(100vh - 100px);
    height: calc(100vh - 100px);
    overflow: hidden;
  }
  
  .news {
    width: 100%;
    height: calc(100vh - 10rem);
    padding: 0;
    overflow: hidden;
    .article-image-container-container {
      position: relative;
      width: 100%;
      padding: 0;
      background: -webkit-linear-gradient(to bottom, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
      background: linear-gradient(to bottom, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
    }
    .spinner {
      position: absolute;
    }
    .article-image {
      opacity: 0;
      width: 100%;
      height: 235px;
      border-bottom: 0.5rem solid white;
      display: inline-block;
      -webkit-transition: opacity 1s ease;
      transition: opacity 1s ease;
    }
    .news-text {
      padding: 1rem;
      height: calc(100vh - 34rem);
      overflow-y: scroll;
      background: linear-gradient(to top, rgba(214, 214, 214, 0.65) 0%,rgba(0,0,0,0) 100%);
    }
    .news-text::-webkit-scrollbar {
      display: block!important;
      width: 0.5rem;
      visibility: visible!important;
    }
    .news-text::-webkit-scrollbar-thumb {
      background: #d23f50;
      // outline: 1px solid #852016;
    }
    .article-image[lazy=loading] {
      opacity: 1;
    }
    .article-image[lazy=loaded] {
      opacity: 1
    }
    .article-image[lazy=loaded]+.spinner {
      display: none;
    }
    .article-image[lazy=error] {
      display: block;
      opacity: 1;
      background: url('../assets/no_image_placeholder.png') no-repeat;
    }
    .article-image[lazy=error]+.spinner {
      display: none;
    }
  }
</style>
