<template>
  <q-toolbar slot="header">
    <q-btn flat @click="$refs.layout.toggleLeft()">
      <q-icon name="menu" />
    </q-btn>
    <div class="q-toolbar-title">
      Quasar Layout
    </div>
  </q-toolbar>
</template>

<script>
  import {
    QToolbar,
    QBtn,
    QIcon,
    QList
  } from 'quasar'
  
  export default {
    name: 'HeaderNav',
    data() {
      return {};
    },
    components: {
      QToolbar,
      QBtn,
      QIcon,
      QList
    }
  };
</script>

