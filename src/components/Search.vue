<template>
  <div class="search-page">
    <div class="search" :class="{'bring-search':isSearchInputVisible}">
  
      <q-btn class="back">
        <q-icon @click="goBack" name="keyboard arrow left" />
      </q-btn>
  
      <div class="search-input">
        <q-search inverted ref="inputSearchRef" placeholder="Search in 5000+ news sources" icon="" float-label="What is in your Mind?" v-model="searchModel" @keyup.enter="fetchSearchQuery" />
        <q-btn class="search-btn">
          <q-icon name="search" @click="fetchSearchQuery" />
        </q-btn>
      </div>
    </div>
    <section class="scroll-container" v-if="searchResult.length > 0">
      <q-card v-for="(result, index) in searchResult" :key="index">
        <q-card-media class="test">
          <!-- <img v-lazy="result.urlToImage" :src="result.urlToImage" @click="result.showDescription = !result.showDescription"> -->
  
          <div class="article-image-container row justify-center items-center">
            <img class="article-image" v-lazy="result.urlToImage" :src="result.urlToImage || ''" alt="" width="100%">
            <q-spinner-cube class="spinner" color="red-8" :size="50" />
          </div>
  
  
        </q-card-media>
        <q-card-title>
          <h2 @click="result.showDescription = !result.showDescription">{{result.title}}</h2>
        </q-card-title>
        <q-card-main>
          <p :class="{isVisible: result.showDescription}" class="description">{{result.description}}</p>
          <p>{{result.source.name}}</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions class="row justify-between">
          <q-btn flat @click="shareNews(result)">SHARE</q-btn>
          <q-btn flat class="read-full"><a :href="result.url" target="_blank">READ THE FULL STORY</a></q-btn>
        </q-card-actions>
      </q-card>
    </section>
    <div class="no-result" v-else>
      <div class="recent-search-query">
        <h2 v-if="recentSearches.length>0">Recent Searches</h2>
        <q-chip tabindex="-1" @click="fillSearchAndLoad($event)" v-for="(recentSearch, index) in recentSearches" :key="index" color="dark">
          {{recentSearch}}
        </q-chip>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import {
    mapActions,
    mapState
  } from "vuex";
  import VueLazyload from "vue-lazyload";
  import {
    QSearch,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QCardMedia,
    QIcon,
    QCardActions,
    QBtn,
    QChip,
    QSpinnerCube
  } from "quasar";
  import {
    fetchSearchNews
  } from "../network/requestNews";
  import {
    cordovaShare
  } from '../utils/commonUtils'
  Vue.use(VueLazyload);
  
  export default {
    data() {
      return {
        searchModel: "",
        searchQuery: "",
        isSearchInputVisible: false,
        searchResult: [],
        recentSearches: []
      };
    },
    mounted() {
      this.isSearchInputVisible = true;
      let recentSearches = localStorage.getItem("recentSearches");
      if (recentSearches) {
        this.recentSearches = JSON.parse(recentSearches);
      }
      this.$refs.inputSearchRef.focus();
    },
    methods: {
      fetchSearchQuery() {
        console.log("searchModel", this.searchModel);
        // var searchQuery = event.target.value || this.$refs.searchQuery.value;
        var searchQuery = this.searchModel;
        var recentSearches = this.recentSearches;
        var searchQueryPositionInRecentSearches = recentSearches.indexOf(
          searchQuery
        );
        // this.searchQuery = searchQuery;
        if (searchQuery) {
          if (searchQueryPositionInRecentSearches === -1) {
            console.log("not inside", recentSearches);
            // remove first element and insert new element once excced the max limit
            if (recentSearches.length >= 5) {
              recentSearches.shift();
              recentSearches.unshift(searchQuery);
            } else {
              recentSearches.unshift(searchQuery);
            }
          } else {
            console.log("already inside");
            recentSearches.splice(searchQueryPositionInRecentSearches, 1);
            recentSearches.unshift(searchQuery);
          }
  
          // // remove first element and insert new element once excced the max limit
          // if (recentSearches.length >= 5) {
          //   recentSearches.shift();
          //   recentSearches.push(searchQuery);
          // } else {
          //   recentSearches.push(searchQuery);
          // }
          localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
        } else {
          console.log("blank input field");
          return;
        }
        fetchSearchNews(searchQuery).then(results => {
          this.searchResult = results.articles.map(item => {
            item.showDescription = false;
            return item;
          });
        });
      },
      shareNews(newsItem) {
        const {
          description = 'No Description Provided',
            title = "No Title Provided",
            url,
            urlToImage
        } = newsItem;
        cordovaShare({
          description,
          title,
          url,
          urlToImage
        });
      },
      goBack() {
        this.isSearchInputVisible = false;
        this.$router.go(-1);
      },
      fillSearchAndLoad(event) {
        console.log(event);
        this.searchModel = event.target.innerText;
        this.fetchSearchQuery();
      }
    },
    components: {
      QSearch,
      QCard,
      QCardTitle,
      QCardSeparator,
      QCardMain,
      QCardMedia,
      QIcon,
      QCardActions,
      QBtn,
      QChip,
      QSpinnerCube
    },
    watch: {
      $route(to) {
        console.log("params", this.$route.path);
        console.log("sdf", to);
      },
      searchModel: function(params) {
        if (!params) {
          this.searchResult = [];
        }
      }
    }
  };
</script>

<style lang="scss">
  .search-page {
    .article-image-container {
      position: relative;
      width: 100%;
      height: 23.5rem;
      padding: 0;
      background: -webkit-linear-gradient( to bottom, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
      background: linear-gradient( to bottom, rgba(245, 247, 250, 1) 0%, rgba(195, 207, 226, 1) 100%);
      .spinner{
        position: absolute;
      }
    }
    .article-image {
      opacity: 0;
      width: 100%;
      height: 100%;
      display: inline-block;
      -webkit-transition: opacity 1s ease;
      transition: opacity 1s ease;
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
    .scroll-container {
      height: calc(100vh - 5rem);
      overflow: scroll;
    }
    .description.isVisible {
      height: auto;
      max-height: 300px;
    }
    .q-if-control.q-icon,
    .q-if-label,
    .q-input-target {
      color: #343434;
    }
    .q-if-inverted {
      border-radius: 0;
    }
    .q-if-control.q-icon{
      margin-right: 0.5rem;
    }

    .search {
      position: fixed;
      display: flex;
      width: 100%;
      top: -10rem;
      z-index: 2000;
      padding: 0;
      margin: 0;
      height: 5rem;
      transition: top 500ms ease;
      .q-btn {
        box-shadow: 0 0 0 0;
        background: #d23f50;
        color: #fff;
      }
      .search-input {
        margin: 0;
        background: #333;
        flex-grow: 2;
        display: flex;
      }
      .q-search {
        padding: 0;
        background: #ffffff !important;
        box-shadow: 0 0 0 0;
        margin: 0;
        flex-grow: 2;
      }
       ::placeholder {
        color: #7b7b7b !important;
      }
    }
    .back {
      width: 5rem;
      background: #333!important;
    }
    .search.bring-search {
      top: 0;
    }
    img {
      width: 100%;
    }
    .description {
      max-height: 0;
      overflow: hidden;
      transition: max-height 500ms ease;
    }
    .no-result {
      padding: 1rem;
      height: calc(100vh - 5rem);
    }
    .q-chip {
      box-sizing: border-box;
      margin: 0.3rem;
      &:focus {
        outline: none;
        background:#d23f50 !important;
      }
    }
  }
</style>


