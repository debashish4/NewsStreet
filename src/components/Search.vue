<template>
  <div class="search-page">
    <div class="search" :class="{'bring-search':isSearchInputVisible}">
      
        <q-icon class="back" @click="closeSearchPage" name="keyboard arrow left" />
      
      <div class="search-input">
        <q-icon name="search" @click="fetchSearchQuery"/>

        <q-search inverted color="primary" ref="searchValue" :debounce="600" placeholder="Search in 5000+ news sources" icon="" float-label="What is in your Mind?" v-model="searchModel" @keyup.enter="fetchSearchQuery($event)" />

      </div>
    </div>
    <div class="vifnotworking" v-if="searchResult.length > 0">
      <q-card v-for="(result, index) in searchResult" :key="index">
        <q-card-media>
          <img v-lazy="result.urlToImage" :src="result.urlToImage" @click="result.showDescription = !result.showDescription">
        </q-card-media>
        <q-card-title>
          <h2 @click="result.showDescription = !result.showDescription">{{result.title}}</h2>
        </q-card-title>
        <q-card-main>
          <p :class="{isVisible: result.showDescription}" class="description">{{result.description}}</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions class="row justify-between">
          <q-btn flat>SHARE</q-btn>
          <q-btn flat color="primary"><a :href="result.url" target="_blank">READ THE FULL STORY</a></q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="no-result" v-else>
      <div class="recent-search-query">
        <q-chip v-for="(recentSearch, index) in recentSearches" :key="index" color="primary">
          {{recentSearch}}
        </q-chip>
      </div>
  
      <p>No search Results</p>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    mapActions,
    mapState
  } from 'vuex'
  import VueLazyload from 'vue-lazyload'
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
    QChip
  } from 'quasar'
  import {
    fetchSearchNews
  } from '../network/requestNews'
  Vue.use(VueLazyload);
  
  export default {
    data() {
      return {
        searchModel: '',
        isSearchInputVisible: false,
        searchResult: [],
        recentSearches: []
      }
    },
    mounted() {
      this.isSearchInputVisible = true;
      let recentSearches = localStorage.getItem('recentSearches');
      if (recentSearches) {
        this.recentSearches = JSON.parse(recentSearches);
      }
  
    },
    methods: {
      ...mapActions([]),
      fetchSearchQuery(event) {
        var searchValue = event.target.value || this.$refs.searchValue.value;
        if (searchValue){
          this.recentSearches.push(searchValue);
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
        }else{
          console.log('blank input field');
          return;
        }
        fetchSearchNews(searchValue)
          .then(results => {
            this.searchResult = results.articles.map(item => {
              item.showDescription = false;
              console.log(item);
              return item;
            })
          });
      },
      closeSearchPage() {
        this.isSearchInputVisible = false;
        this.$router.go(-1);
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
      QChip
    },
    watch: {
      '$route' (to) {
        console.log('params', this.$route.path);
        console.log('sdf', to);
      }
    }
  }
</script>

<style lang="scss">
  .search-page {
    .isVisible {
      height: auto;
      max-height: 300px;
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
      .search-input {
        margin: 0;
        background: #027BE3;
        flex-grow: 2;
        display: flex;
      }
      .q-btn{
        box-shadow: 0 0 0 0;
      }
      .q-search{
        box-shadow: 0 0 0 0;
        margin:0;
        flex-grow: 2;
      }
    }
    .back {
      width: 5rem;
      background: #027BE3;
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
      height: calc(100vh - 5rem);
    }
  }
</style>


