<template>
  <q-layout ref="layout" view="hHr LpR Fff">
    <div class="flipWrapper" v-if="newsCollection.length">
      <div class="flip-container" :class="{'disable-touch': disableTouch}">
        <div class="flipper" v-touch-swipe="evt => loadNewsInBrowser(newsCollection[socialShareNewsItemIndex].url,evt)" @click="showNewsCount" :style="{ 'transform': `rotateY(${deg}deg)`}">
          <div class="front" v-touch-swipe.horizontal="frontCardSwipe">
            <div class="news">
              <div class="article-image-container row justify-center items-center">
                <img class="article-image" v-lazy="newsCollection[front].urlToImage || ''" :src="newsCollection[front].urlToImage || ''" alt="" width="100%">
                <q-spinner-cube class="spinner" color="red-8" :size="50" />
                <div class="source-info">
                  <p class="source-name">{{newsCollection[front].source.name}}</p>
                  <p class="article-publish-time">{{formatDateFront}}</p>
                </div>
              </div>
              <div class="news-text">
                <h2 class="title">
                  {{newsCollection[front].title}}
                </h2>
                <p class="description">
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
                <div class="source-info">
                  <p class="source-name">{{newsCollection[back].source.name}}</p>
                  <p class="article-publish-time">{{formatDateBack}}</p>
                </div>
              </div>
              <div class="news-text">
                <h2 class="title">
                  {{newsCollection[back].title}}
                </h2>
                <p class="description">
                  {{newsCollection[back].description}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
    <!-- Footer -->
    <news-footer v-if="newsCollection.length" />
  
    <div class="news-count" :class="{'show-count': isNewsCount}">
      <p class="count">{{newsCollection.length - socialShareNewsItemIndex-1}} more news remaining to flip</p>
    </div>
  </q-layout>
</template>


<script>
  import Vue from "vue";
  import {
    mapActions,
    mapState
  } from "vuex";
  import {
    QLayout,
    QSpinnerCube,
    QModal,
    TouchSwipe,
    Events
  } from "quasar";
  import VueLazyload from "vue-lazyload";
  import {
    newsSourcetoApiString,
    openInAppBrowser,
  } from "../utils/commonUtils";
  import {
    eventBus
  } from "../utils/eventBus";
  import {
    fetchNews,
    fetchNewsBasedOnCategory,
    fetchNewsBasedOnCountry,
    fetchNewsBasedOnSources,
  } from "../network/requestNews";
  import Shimmer from "@/Shimmer.vue";
  import SideBarPanel from "@/SideBarPanel.vue";
  import NewsFooter from "@/NewsFooter.vue";
  Vue.use(VueLazyload);
  
  export default {
    name: "News",
    components: {
      QLayout,
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
        newsCollection: [],
        inAppBrowserLoadNewsUrl: "",
        deg: 0,
        front: 0,
        back: 1,
        disableTouch: false,
        socialShareNewsItemIndex: 0,
        publishedDate: "",
        isNewsCount: false
      };
    },
    mounted() {
      let selectedLs = ["the-next-web"];
      let loadNews = () => {
        console.log("selectedNews", this.selectedNews);
        console.log("selectedLs", selectedLs);
        if (this.selectedNews.length) {
          selectedLs = this.selectedNews.map(item => item.id);
          console.log("abc", this.selectedNews);
        }
        fetchNews(selectedLs).then(res => {
          console.log('check res', res);
          if (res && res.length) {
            console.log('inside if', res.constructor);
            res.map(item => {
              item.then(data => {
                console.log('now something', data);
              })
            })
          } else {
            this.newsCollection = res.articles;
          }
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
          eventBus.$emit("stopLoader");
        });
      };
      loadNews();
      eventBus.$on("loadNews", data => {
        loadNews();
      });
      eventBus.$on('evtLoadCategoryNews', category => {
        console.log('received event');
        this.loadCategoryNews(category);
      });
      eventBus.$on('evtLoadCountryNews', country => {
        console.log('received event');
        this.loadCountryNews(country);
      });
      eventBus.$on('evtLoadSourcesNews', domains => {
        console.log('received event');
        this.loadSourcesNews(domains);
      });
      Events.$on("moveTofirst", (param1, param2) => {
        //start from 1st slide
        this.deg = 0;
        this.front = 0;
        this.back = 1;
        this.socialShareNewsItemIndex = 0;
      });
    },
    beforeDestroy() {
      // fix the weird issue of multiple api call on event listen
      eventBus.$off('evtLoadCategoryNews');
      eventBus.$off('evtLoadCountryNews');
      eventBus.$off('evtLoadSourcesNews');
    },
    methods: {
      ...mapActions(["toggleReadMorePanel", "saveSocialShareData"]),
      frontCardSwipe(e) {
        console.log("inside front if", e);
        this.disableTouch = true;
        let newsCollection = this.newsCollection;
        if (e.direction == "left") {
          console.log("left swipe on front card");
          if (this.front < newsCollection.length) {
            if (newsCollection[this.front + 2]) {
              this.deg -= 180;
              setTimeout(_ => {
                this.front = this.front + 2;
                console.log("front", this.front);
              }, 200);
            } else {
              this.deg -= 180;
            }
          }
          if (this.socialShareNewsItemIndex < newsCollection.length) {
            this.socialShareNewsItemIndex++;
          }
        } else if (e.direction == "right") {
          console.log("right swipe on front card");
          if (this.back >= 1) {
            if (newsCollection[this.back - 2]) {
              this.deg += 180;
              setTimeout(_ => {
                this.back = this.back - 2;
                console.log("back", this.back);
              }, 200);
            }
          }
          if (this.socialShareNewsItemIndex > 0) {
            this.socialShareNewsItemIndex--;
          }
        }
        setTimeout(() => {
          this.disableTouch = false;
        }, 500);
        this.showNewsCount();
      },
      backCardSwipe(e) {
        // if (this.back >= 0 && this.back <= (this.newsCollection.length - 1)) {
  
        console.log("inside back if");
        this.disableTouch = true;
        let newsCollection = this.newsCollection;
        if (e.direction == "left") {
          console.log("left swipe on backcard");
          if (this.back < newsCollection.length) {
            if (newsCollection[this.back + 2]) {
              this.deg -= 180;
              setTimeout(_ => {
                this.back = this.back + 2;
                console.log("back", this.back);
              }, 100);
            }
          }
          if (this.socialShareNewsItemIndex < newsCollection.length - 1) {
            this.socialShareNewsItemIndex++;
          }
        } else if (e.direction == "right") {
          console.log("right swipe on backcard");
          if (this.front >= 0) {
            if (this.back == newsCollection.length - 1) {
              this.deg += 180;
            } else if (newsCollection[this.front - 2]) {
              this.deg += 180;
              setTimeout(_ => {
                this.front = this.front - 2;
                console.log("front", this.front);
              }, 100);
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
        this.showNewsCount();
      },
      openWindow() {
        // this.toggleReadMorePanel();
        try {
          if (cordova) {
            let url = this.inAppBrowserLoadNewsUrl;
            openInAppBrowser(url);
          }
        } catch (err) {
          console.log(err);
        }
      },
      loadNewsInBrowser(direction, evt) {
        console.log({
          direction,
          evt
        });
        let url = this.newsCollection[this.socialShareNewsItemIndex].url;
        if (evt.direction == "up" && evt.distance.y > 50) {
          this.inAppBrowserLoadNewsUrl = url;
          this.openWindow();
        }
      },
  
      showNewsCount() {
        let vm = this;
        vm.isNewsCount = true;
        if (window.newsCount) window.clearInterval(window.newsCount);
        window.newsCount = setTimeout(_ => {
          vm.isNewsCount = false
        }, 2000)
      },
      resetNewsCard() {
        this.deg = 0;
        this.front = 0;
        this.back = 1;
        this.socialShareNewsItemIndex = 0;
      },
      loadCategoryNews(category) {
        console.log('clicked category', category);
        fetchNewsBasedOnCategory(category)
          .then(response => {
            let articles = response.data.articles || [];
            this.newsCollection = articles;
            this.resetNewsCard();
            eventBus.$emit('stopLoader');
            console.log('here', response.data.articles);
          })
          .catch(err => {
            console.log('loadCategoryNews', err);
          })
      },
      loadCountryNews(country) {
        console.log('clicked country', country);
        fetchNewsBasedOnCountry(country)
          .then(response => {
            let articles = response.data.articles || [];
            this.newsCollection = articles;
            this.resetNewsCard();
            eventBus.$emit('stopLoader');
            console.log('here', response.data.articles);
          })
          .catch(err => {
            console.log('loadCategoryNews', err);
          })
      },
      loadSourcesNews(sources) {
        fetchNewsBasedOnSources(sources)
          .then(response => {
            let articles = response.articles || [];
            this.resetNewsCard();
            this.newsCollection = articles;
            eventBus.$emit('stopLoader');
            console.log('here', response);
          })
          .catch(err => {
            console.log('loadsource news error', err);
          })
      }
  
    },
    computed: {
      ...mapState({
        isReadMorePanelOpen: state => state.app.isReadMorePanelOpen,
        selectedNews: state =>
          state.news.selectedNews || ["the-next-web", "techcrunch"]
      }),
      formatDateFront() {
        console.log('here front', this.newsCollection[this.front]);
        let publishedAt = this.newsCollection[this.front].publishedAt;
        if (publishedAt) {
          let publishedDateEndPos = publishedAt.indexOf("T");
          return this.publishedDate = publishedAt.slice(0, publishedDateEndPos);
        } else {
          return this.publishedDate = "Not Available";
        }
      },
      formatDateBack() {
        console.log('here back', this.newsCollection[this.back]);
        let publishedAt = this.newsCollection[this.back].publishedAt;
        if (publishedAt) {
          let publishedDateEndPos = publishedAt.indexOf("T");
          return this.publishedDate = publishedAt.slice(0, publishedDateEndPos);
        } else {
          return this.publishedDate = "Not Available";
        }
        console.log('publishdate', this.publishedDate);
      }
    },
    watch: {
      socialShareNewsItemIndex: function(newsIndex) {
        const {
          description = "No Description Provided",
            title = "No Title Provided",
            url,
            urlToImage
        } = this.newsCollection[newsIndex];
        console.log("newsIndex", newsIndex);
        this.saveSocialShareData({
          description,
          title,
          url,
          urlToImage
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  /* entire container, keeps perspective */
  
  .disable-touch {
    pointer-events: none;
  }
  
  .flipWrapper {
    background-image: url("../assets/egg-shell.png");
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
      height: 100%;
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
    .spinner {
      position: absolute;
    }
    .article-image-container {
      position: relative;
      width: 100%;
      height: 23.5rem;
      padding: 0;
      background: -webkit-linear-gradient( to bottom, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
      background: linear-gradient( to bottom, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
    }
    .article-image {
      opacity: 0;
      width: 100%;
      height: 100%;
      display: inline-block;
      -webkit-transition: opacity 1s ease;
      transition: opacity 1s ease;
    }
    .source-info {
      background: rgba(51, 51, 51, 0.6);
      display: flex;
      width: 100%;
      height: 3.5rem;
      position: absolute;
      bottom: 0;
      justify-content: space-between;
      align-items: center;
      .source-name,
      .article-publish-time {
        margin: 0;
        padding: 0 1rem;
        color: white;
        text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
      }
    }
    .news-text {
      padding: 1rem;
      height: calc(100vh - 34rem);
      overflow-y: scroll;
      background: linear-gradient( to top, rgba(214, 214, 214, 0.65) 0%, rgba(0, 0, 0, 0) 100%);
      .description{
        margin-top:1rem;
      }
    }
    .news-text::-webkit-scrollbar {
      display: block !important;
      width: 0.5rem;
      visibility: visible !important;
    }
    .news-text::-webkit-scrollbar-thumb {
      background: #d23f50;
      // outline: 1px solid #852016;
    }
    .article-image[lazy="loading"] {
      opacity: 1;
    }
    .article-image[lazy="loaded"] {
      opacity: 1;
    }
    .article-image[lazy="loaded"]+.spinner {
      display: none;
    }
    .article-image[lazy="error"] {
      display: block;
      opacity: 1;
      background: url("../assets/no_image_placeholder.jpg") no-repeat;
      background-size: cover;
    }
    .article-image[lazy="error"]+.spinner {
      display: none;
    }
  }
  
  .news-count {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 20vw;
    z-index: 2000;
    opacity: 0;
    transition: opacity 500ms ease;
    .count {
      padding: 0.5rem;
      border-radius: 2rem;
      color: white;
      width: 20rem;
      margin: 0 auto;
      font-size: 1.2rem;
      background: rgba(51, 51, 51, 0.7);
    }
  }
  
  .show-count {
    opacity: 1;
  }
</style>
