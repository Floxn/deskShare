<template>
  <navigation />
  <div class="rooms-wrapper">
    <h1 class="page-title">Rooms</h1>
    <rooms-list />
  </div>
</template>

<script>
import RoomsList from '@/views/components/RoomsList.vue'
import Navigation from '@/views/components/Navigation.vue'
export default {
  data() {
    return {}
  },
  components: {
    'rooms-list': RoomsList,
    navigation: Navigation
  }
}
</script>

<style lang="scss" scoped></style>
