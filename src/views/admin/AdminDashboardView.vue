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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomsList from '@/views/components/RoomsList.vue'

export default {
  data() {
    return {
      roomsData: [],
      desksData: []
    }
  },
  components: {
    'rooms-list': RoomsList
  },
  methods: {
    async getRooms() {
      const response = await fetch('http://localhost:3000/rooms')
      const rooms = await response.json()
      this.roomsData = rooms
    },
    async getDesks() {
      const response = await fetch('http://localhost:3000/desks')
      const desks = await response.json()
      this.roomsData = desks
    }
  },
  beforeMount() {
    this.getRooms()
    this.getDesks()
  }
}
</script>

<style lang="scss" scoped></style>
