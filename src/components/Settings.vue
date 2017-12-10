<template>
  <q-list highlight>
    <q-list-header>Recent chats</q-list-header>
    <q-item>
      <q-item-main>
        <q-item-tile label>John Doe</q-item-tile>
        <q-item-tile sublabel>Quasar enthusiast</q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
  import {
    QList,
    QItem,
    QListHeader,
    QItemSide,
    QItemMain,
    QItemTile,
    QItemSeparator
  } from "quasar"
  
  export default {
    data() {
      return {
  
      }
    },
  
    components: {
      QList,
      QItem,
      QListHeader,
      QItemSide,
      QItemMain,
      QItemTile,
      QItemSeparator
  
    }
  }
</script>

<style lang="scss" scoped>
  
</style>


