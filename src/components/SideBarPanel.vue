<template>
  <div class="side-bar-panel-wrapper">
    <div class="side-bar-panel">
      <div class="country categories clearfix">
        <div class="heading-wrapper">
          <div class="heading">
            <!-- <h4>News based on Country</h4> -->
            <h4>Country</h4>
            <div class="skew"></div>
          </div>
          <div class="border"></div>
  
        </div>
        <div class="icon india" @click="loadSelectedCountryNews('in')">
          <p><i class="country-flag"></i>
            <span class="text">India</span></p>
        </div>
        <div class="icon usa" @click="loadSelectedCountryNews('us')">
          <p><i class="country-flag"></i>
            <span class="text">USA</span></p>
        </div>
      </div>
      <div class="categories clearfix">
        <div class="heading-wrapper">
          <div class="heading">
            <!-- <h4>World News -- Top Headlines from world best news sites</h4> -->
            <h4>Categories</h4>
            <div class="skew"></div>
          </div>
          <div class="border"></div>
        </div>
        <div class="icon technology" @click="loadSelectedCategoryNews('technology')">
          <p><i class="nw-technology"></i>
            <span class="text">Technology</span></p>
        </div>
        <div class="icon general" @click="loadSelectedCategoryNews('general')">
          <p><i class="nw-general"></i>
            <span class="text">General</span></p>
        </div>
        <div class="icon entertainment" @click="loadSelectedCategoryNews('entertainment')">
          <p><i class="nw-entertainment"></i>
            <span class="text">Entertainment</span></p>
        </div>
        <div class="icon health" @click="loadSelectedCategoryNews('health')">
          <p><i class="nw-health"></i>
            <span class="text">Health</span></p>
        </div>
        <div class="icon business" @click="loadSelectedCategoryNews('business')">
          <p><i class="nw-business"></i>
            <span class="text">Business</span></p>
        </div>
        <div class="icon sports" @click="loadSelectedCategoryNews('sports')">
          <p><i class="nw-sports"></i>
            <span class="text">Sports</span></p>
        </div>
        <div class="icon science" @click="loadSelectedCategoryNews('science')">``
          <p><i class="nw-science"></i>
            <span class="text">Science</span></p>
        </div>
      </div>
      <div class="top-sources clearfix">
        <div class="heading-wrapper">
          <div class="heading">
            <!-- <h4>World News -- Top Headlines from world best news sites</h4> -->
            <h4>Top Sources</h4>
            <div class="skew"></div>
          </div>
          <div class="border"></div>
        </div>
        <!-- <div class="source-chips">
                          <q-chip color="primary" v-for="(source, index) in selectedSources" :key="index">
                            <p>{{source}}</p>
                            <q-icon name="clear" class="close-chip" @click="removeFromSelection(source,index)" />
                          </q-chip>
                        </div> -->
        <div class="sources-list clearfix">
          <div class="news-list-wrapper">
            <div class="news-list">
              <div class="news-item" @click="loadSelectedSourcesNews(source.url)" v-for="(source, index) in topSourcesNews" :key="index">
                <div class="news-thumb">
                  <p class="source-logo"><img :src="'http://via.placeholder.com/100x100'" :alt="`${source.name} logo`" /></p>
                  <p class="source-name">{{source.name}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- <q-list separator class="clearfix">
                            <q-collapsible class="nw-icon nw-technology technology" group="top_sources" label="Technology" v-if="NewsCategories.technology.length">
                              <q-checkbox v-for="(source, index) in NewsCategories.technology" :key="index" v-model="selectedSources" :val="source.name" :label="source.name" />
                            </q-collapsible>
                            <q-collapsible class="nw-icon nw-general general" group="top_sources" label="General" v-if="NewsCategories.general.length">
                              <q-checkbox v-for="(source, index) in NewsCategories.general" :key="index" v-model="selectedSources" :val="source.name" :label="source.name" />
                            </q-collapsible>
                            <q-collapsible class="nw-icon nw-entertainment entertainment" group="top_sources" label="Entertainment" v-if="NewsCategories.entertainment.length">
                              <q-checkbox v-for="(source, index) in NewsCategories.entertainment" :key="index" v-model="selectedSources" :val="source.name" :label="source.name" />
                            </q-collapsible>
                            <q-collapsible class="nw-icon nw-health health" group="top_sources" label="Health" v-if="NewsCategories.health.length">
                              <q-checkbox v-for="(source, index) in NewsCategories.health" :key="index" v-model="selectedSources" :val="source.name" :label="source.name" />
                            </q-collapsible>
                            <q-collapsible class="nw-icon nw-business business" group="top_sources" label="Business" v-if="NewsCategories.business.length">
                              <q-checkbox v-for="(source, index) in NewsCategories.business" :key="index" v-model="selectedSources" :val="source.name" :label="source.name" />
                            </q-collapsible>
                            <q-collapsible class="nw-icon nw-sports sports" group="top_sources" label="Sports" v-if="NewsCategories.sports.length">
                              <q-checkbox v-for="(source, index) in NewsCategories.sports" :key="index" v-model="selectedSources" :val="source.name" :label="source.name" />
                            </q-collapsible>
                            <q-collapsible class="nw-icon nw-science science" group="top_sources" label="Science" v-if="NewsCategories.science.length">
                              <q-checkbox v-for="(source, index) in NewsCategories.science" :key="index" v-model="selectedSources" :val="source.name" :label="source.name" />
                            </q-collapsible>
                          </q-list> -->
        </div>
      </div>
      <!-- <news-select-modal :title="selectNewsModalDataTitle" :data="selectNewsModalData" /> -->
    </div>
    <!-- <div class="continue full-width" v-if="selectedSources.length">
      <q-btn class="full-width load-news" big @click="loadSelectedSourcesNews">Load Selected News</q-btn>
    </div> -->
  </div>
</template>

<script>
  import {
    QIcon,
    QBtn,
    QList,
    QCollapsible,
    QCheckbox,
    QChip,
    TouchSwipe,
    TouchHold
  } from "quasar";
  import {
    mapActions
  } from "vuex";
  import {
    NEWS_CATEGORY,
    INDIA_NEWS_SOURCES
  } from "../constants/UI_constants";
  import {
    stringifyArray
  } from "../utils/commonUtils";
  import {
    fetchNewsSource
  } from "../network/requestNews";
  import {
    categoryName,
    eventBus
  } from "../utils/eventBus";
  import NewsSelectModal from "@/NewsSelectModal";
  
  export default {
    data() {
      return {
        NewsCategories: {
          // general: [],
          // business: [],
          // entertainment: [],
          // science: [],
          // health: [],
          // sports: [],
          // technology: []
        },
        topSourcesNews: [],
        selectedSources: [],
        checkedItemUrls: [],
        checkedItemNames: [],
        isPanelOpen: false,
        selectNewsModalData: [],
        selectNewsModalDataTitle: ""
      };
    },
    directives: {
      TouchSwipe,
      TouchHold
    },
    mounted() {
      eventBus.$on("@close", () => {
        console.log("this event is working");
      });
  
      INDIA_NEWS_SOURCES.forEach((item, index) => {
        this.topSourcesNews.push(item);
      });
  
      if (localStorage.getItem("selectedNewsSources")) {
        let selectedNews = localStorage.getItem("selectedNewsSources");
  
        let selectedNewsInArr = JSON.parse(selectedNews);
        this.selectedSources = selectedNewsInArr;
      }
    },
    methods: {
      ...mapActions(["toggleNewsListModal", "toggleDrawer", "saveSelectedNews"]),
      loadSelectedCategoryNews(category) {
        eventBus.$emit("evtLoadCategoryNews", category);
        this.toggleDrawer();
        //   this.toggleNewsListModal();
      },
  
      loadSelectedCountryNews(country) {
        eventBus.$emit("evtLoadCountryNews", country);
        this.toggleDrawer();
      },
  
      // loadSelectedSourcesNews() {
      //   let checkedNewsSourcesUrls = this.selectedSources.map((item, index) => {
      //     for (var i = 0; i < INDIA_NEWS_SOURCES.length; i++) {
      //       if (INDIA_NEWS_SOURCES[i].name == item) {
      //         return INDIA_NEWS_SOURCES[i].url;
      //         break;
      //       }
      //     }
      //   });
  
      //   let stringifiedNewsSourcesUrls = stringifyArray(checkedNewsSourcesUrls);
  
      //   localStorage.setItem(
      //     "selectedNewsSources",
      //     JSON.stringify(this.selectedSources)
      //   );
      //   eventBus.$emit("evtLoadSourcesNews", stringifiedNewsSourcesUrls);
      //   this.toggleDrawer();
      // },
  
  
      loadSelectedSourcesNews(sourceUrl) {
          console.log('loadSelectedSourcesNews', sourceUrl);
        eventBus.$emit("evtLoadSourcesNews", sourceUrl);
        this.toggleDrawer();
      },
  
      // removeFromSelection(source, index) {
      //   console.log("dekhte hai", source, index);
      //   console.log(this.selectedSources);
      //   this.selectedSources.splice(index, 1);
      // },
  
      openNewsSelectModal(categoryName) {
        console.log("openNewsSelectModal", categoryName);
  
        switch (categoryName) {
          case NEWS_CATEGORY.GENERAL:
            {
              this.selectNewsModalDataTitle = NEWS_CATEGORY.GENERAL;
              this.selectNewsModalData = this.NewsCategories.general;
              this.toggleNewsListModal();
              break;
            }
          case NEWS_CATEGORY.BUSINESS:
            {
              console.log("hello", this.NewsCategories.business);
              this.selectNewsModalDataTitle = NEWS_CATEGORY.BUSINESS;
              this.selectNewsModalData = this.NewsCategories.business;
              this.toggleNewsListModal();
              break;
            }
          case NEWS_CATEGORY.ENTERTAINMENT:
            {
              this.selectNewsModalDataTitle = NEWS_CATEGORY.ENTERTAINMENT;
              this.selectNewsModalData = this.NewsCategories.entertainment;
              this.toggleNewsListModal();
              break;
            }
          case NEWS_CATEGORY.SCIENCE:
            {
              this.selectNewsModalDataTitle = NEWS_CATEGORY.SCIENCE;
              this.selectNewsModalData = this.NewsCategories.science;
              this.toggleNewsListModal();
              break;
            }
          case NEWS_CATEGORY.HEALTH:
            {
              this.selectNewsModalDataTitle = NEWS_CATEGORY.HEALTH;
              this.selectNewsModalData = this.NewsCategories.health;
              this.toggleNewsListModal();
              break;
            }
          case NEWS_CATEGORY.SPORTS:
            {
              console.log("sports content", this.NewsCategories.sports);
              this.selectNewsModalDataTitle = NEWS_CATEGORY.SPORTS;
              this.selectNewsModalData = this.NewsCategories.sports;
              this.toggleNewsListModal();
              break;
            }
          case NEWS_CATEGORY.TECHNOLOGY:
            {
              this.selectNewsModalDataTitle = NEWS_CATEGORY.TECHNOLOGY;
              this.selectNewsModalData = this.NewsCategories.technology;
              this.toggleNewsListModal();
              break;
            }
        }
      }
    },
    components: {
      QIcon,
      QBtn,
      QList,
      QCollapsible,
      QCheckbox,
      QChip,
      NewsSelectModal
    }
  };
</script>

<style lang="scss">
  .side-bar-panel {
    width: 100%;
    height: 100vh;
    padding-bottom: 5rem;
    overflow: scroll;
    .categories {
      padding: 1rem 0.5rem;
    }
  }
  
  .continue {
    height: 50px;
    position: fixed;
    bottom: 0;
    z-index: 1;
    button {
      color: white;
      height: 100%;
      background: #d23f50;
    }
  }
  
  .icon {
    margin: 1.2vw;
    padding-top: 1rem;
    display: flex;
    border-radius: 0.8rem;
    float: left;
    align-items: center;
    justify-content: center;
    width: 30vw;
    height: 30vw;
    overflow: hidden;
    i {
      width: 100%;
      display: block;
      color: #343434;
      font-size: 7rem;
      text-align: center;
    }
    .text {
      text-align: center;
      font-size: 1.3rem;
      display: inline-block;
      width: 100%;
    }
  }
  
  .business {
    background-image: linear-gradient(60deg, #96deda 0%, #50c9c3 100%);
  }
  
  .entertainment {
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  }
  
  .general {
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  }
  
  .health {
    background-image: linear-gradient(-60deg, #a8edea 0%, #fed6e3 100%);
  }
  
  .science {
    background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
  }
  
  .sports {
    background-image: linear-gradient(60deg, #ffc3a0 0%, #ffafbd 100%);
  }
  
  .technology {
    background-image: linear-gradient(-225deg, #ffe29f 0%, #ffa99f 100%);
  }
  
  .country {
    .country-flag {
      width: 8rem !important;
      height: 8rem;
      border-radius: 50%;
      display: block;
      background-size: cover;
    }
    .icon {
      background: #a2ded0;
      background-size: cover;
    }
    .india .country-flag {
      background-image: url("../assets/in.svg");
    }
    .usa .country-flag {
      background-image: url("../assets/us.svg");
    }
  }
  
  .heading {
    height: 30px;
    width: 200px;
    position: relative;
    display: flex;
    align-content: center;
    background: #333;
    .skew {
      background: #333;
      height: 100%;
      width: 120px;
      position: absolute;
      right: -10px;
      transform: skew(35deg);
    }
  }
  
  .border {
    position: relative;
    z-index: 12;
    width: 100%;
    border: 0.2rem solid #d23f50;
    margin-bottom: 1rem;
  }
  
  h4 {
    position: absolute;
    padding: 0.5rem;
    color: #fff;
    z-index: 1;
    top: 0;
    font-size: 1.7rem;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
  }
  
  // .top-sources {
  //   .nw-icon {
  //     position: relative !important;
  //   }
  //   .nw-icon:before {
  //     font-size: 2rem;
  //     position: absolute;
  //     top: -0.8rem;
  //     margin: 2rem;
  //   }
  //   .q-collapsible {
  //     .q-collapsible-sub-item {
  //       background: white;
  //     }
  //   }
  //   .q-item-main {
  //     font-size: 1.8rem;
  //     font-family: "Raleway", "sans-serif";
  //     padding-left: 4rem !important;
  //   }
  //   .q-list {
  //     padding: 0;
  //   }
  // }
  .news-list-wrapper {
    background-image: url('../assets/cream-pixels.png');
    .title {
      margin: 0;
      padding: 1rem;
      height: 5rem;
      color: #fff;
      background: #595959;
    }
  }
  
  .news-list {
    display: block;
    .news-item {
      position: relative;
      width: 29vw;
      height: 33vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #d23f50;
      box-sizing: content-box;
      border-radius: 0.5rem;
      float: left;
      margin: 0.5rem;
      background: rgba(210, 63, 80, 0.1);
      .news-thumb {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
      }
      .source-logo {
        width: 7rem;
        height: 7rem;
        display: block;
        margin: 0 auto;
        img {
          display: block;
          background: #ccc;
          border-radius: 1rem;
          width: 100%;
          height: 100%;
        }
      }
      .source-name {
        // width: 32vw;
        // overflow: hidden;
        word-break: break-word;
        font-size: 1.3rem;
        text-align: center;
        margin: 0;
      }
    }
  }
</style>


