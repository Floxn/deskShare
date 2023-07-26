<template>
  <navigation />
  <div class="desks-wrapper">
    <h1 class="page-title">Desks</h1>
    <desks-list />
  </div>
</template>

<script>
import DesksList from '@/views/components/DesksList.vue'
import Navigation from '@/views/components/Navigation.vue'
export default {
  data() {
    return {}
  },
  components: {
    'desks-list': DesksList,
    navigation: Navigation
  }
}
</script>

<style lang="scss" scoped></style>
