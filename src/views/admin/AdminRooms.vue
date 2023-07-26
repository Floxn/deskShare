<template>
  <div class="rooms-wrapper">
    <h1 class="page-title">Rooms</h1>
    <rooms-list />
  </div>
</template>

<script>
import RoomsList from '@/views/components/RoomsList.vue'
export default {
  data() {
    return {}
  },
  components: {
    'rooms-list': RoomsList
  }
}
</script>

<style lang="scss" scoped></style>
