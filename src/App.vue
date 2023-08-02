<template>
  <navigation />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import Navigation from '@/views/components/Navigation.vue'

export default {
  data() {
    return {}
  },
  components: {
    navigation: Navigation
  }
}
</script>

<style lang="scss">
/*  import normalize.css
    https://github.com/necolas/normalize.css/
*/
@import 'normalize.css';

/*
import main.scss
*/
@import 'assets/scss/main.scss';
</style>
