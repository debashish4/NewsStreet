<template>
  <div class="search-page">
    <q-search class="search" :class="{'bring-search':isSearchInputVisible}" inverted color="primary" :debounce="600" placeholder="Search from 5000+ news sources" icon="search" float-label="What is in your Mind?" v-model="searchModel" @keyup.enter="fetchSearchQuery($event)"
    />
    <div>
      <q-card inlinquery.targetq-card-media v-for="(result, index) in searchResult" :key="index">
        <img :src="result.urlToImage" @click="result.showDescription = !result.showDescription">
        </q-card-media>
        <q-card-title>
          {{result.title}}
  
        </q-card-title>
        <q-card-main>
          <p :class="{isVisible: result.showDescription}" class="description">{{result.description}}</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
  
          <q-btn flat>SHARE</q-btn>
          <q-btn flat color="primary">READ MORE</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
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
  } from 'quasar'
  
  import {
    fetchSearchNews
  } from '../network/requestNews'
  
  export default {
    data() {
      return {
        searchModel: '',
        isSearchInputVisible: false,
        searchResult: [],
      }
    },
    mounted() {
      console.log('sdef', this.$route.path);
      this.isSearchInputVisible = true;
  
    },
    methods: {
      fetchSearchQuery(event) {
        let query = event.target.value;
        console.log(query);
        fetchSearchNews(query)
          .then(results => {
            this.searchResult = results.articles.map(item => {
              item.showDescription = false;
              return item;
            })
          });
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
    },
    watch: {
      '$route' (to) {
        console.log('params', this.$route.path);
        console.log('sdf', to);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-page {
    .search {
      position: fixed;
      width: 100%;
      top: -10rem;
      z-index: 2000;
      padding: 0;
      margin: 0;
      height: 5rem;
      transition: top 500ms ease;
    }
    .search.bring-search {
      top: 0;
    }
    img {
      width: 100%;
    }
    .description{
      max-height:0;
      overflow:hidden;
      transition:max-height 800ms ease;
    }
    .isVisible{
      height:auto;
      max-height:300px;
    }
  }
</style>


