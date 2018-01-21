<template>
  <div class="settings">
    <div style="width:100px">
      <!-- Single Selection using Radios -->
  
  
    </div>
    <q-list-header>Toggles</q-list-header>
    <q-item tag="label" multiline>
      <q-item-main>
        <q-item-tile label>Country</q-item-tile>
        <q-item-tile sublabel>Select country which you prefer news from</q-item-tile>
      </q-item-main>
      <q-item-side right>
        <q-select class="select-country" v-model="country" :options="countryOptions" />
      </q-item-side>
    </q-item>
    <q-item tag="label" multiline>
      <q-item-main>
        <q-item-tile label>Push Notifications</q-item-tile>
        <q-item-tile sublabel>Turn push notification on or off </q-item-tile>
      </q-item-main>
      <q-item-side right>
        <q-toggle v-model="checked"></q-toggle>
      </q-item-side>
    </q-item>
    <q-item tag="label" multiline>
      <q-item-main>
        <q-item-tile label>Theme</q-item-tile>
        <q-item-tile sublabel>Toggle between light and dark theme</q-item-tile>
      </q-item-main>
      <q-item-side right>
        <q-toggle v-model="checked" color="purple"></q-toggle>
      </q-item-side>
    </q-item>
    <q-item tag="label" multiline>
      <q-item-main>
        <q-item-tile label>Events and reminders</q-item-tile>
        <q-item-tile sublabel lines="3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        </q-item-tile>
      </q-item-main>
      <q-item-side right>
        <q-toggle v-model="checked" color="red"></q-toggle>
      </q-item-side>
    </q-item>
    <q-item-separator />
    <div class="continue full-width">
      <q-btn class="full-width load-news" @click="applySettings" big>Apply Settings</q-btn>
    </div>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QListHeader,
    QItemSide,
    QItemMain,
    QItemTile,
    QItemSeparator,
    QToggle,
    QSelect,
    QBtn
  } from "quasar"
  import {
    mapActions,
    mapState
  } from "vuex"
  export default {
    data() {
      return {
        checked: false,
        country: '',
        countryOptions: [{
            label: "India",
            value: "in"
          },
          {
            label: "USA",
            value: "us"
          }
        ]
      };
    },
  
    components: {
      QList,
      QItem,
      QListHeader,
      QItemSide,
      QItemMain,
      QItemTile,
      QItemSeparator,
      QToggle,
      QSelect,
      QBtn
    },
  
    mounted() {
      if (this.settings.country) {
        this.country = this.settings.country;
      }
    },
  
    computed: {
      ...mapState({
        settings: state => state.settings
      })
    },
    methods: {
      ...mapActions(['changeCountry']),
  
      applySettings() {
        console.log('route', this.$route);
        this.changeCountry(this.country);
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.$router.push('/');
      }
    }
  };
</script>

<style lang="scss">
  .settings {
    .select-country {
      margin: 0;
    }
    .q-item-sublabel {
      font-size: 1.3rem;
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
  }
</style>


