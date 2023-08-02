<template>
  <div class="container">
    <div class="row room-create">
      <div class="column">
        <h1>Admin Dashboard</h1>
      </div>
      <div class="row">
        <div class="column">
          <h2>Rooms</h2>
          <rooms-list />
        </div>
        <div class="column">
          <h2>Desks</h2>
          <desks-list />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomsList from '@/views/components/RoomsList.vue'
import DesksList from '@/views/components/DesksList.vue'

export default {
  data() {
    return {}
  },
  components: {
    'rooms-list': RoomsList,
    'desks-list': DesksList
  }
}
</script>

<style lang="scss" scoped></style>
