<template>
  <div class="container">
    <div class="row">
      <div class="column room" v-for="room in roomsData">
        <h2 class="room-title">
          {{ room.name }}
        </h2>
        <div class="room-id">
          {{ room.id }}
        </div>
        <div class="room-noiselevel">
          {{ room.noiseLevel }}
        </div>
        <button class="button edit">edit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomsData: []
    }
  },
  methods: {
    async getRooms() {
      const response = await fetch('http://localhost:3000/rooms')
      const rooms = await response.json()
      this.roomsData = rooms
    }
  },
  beforeMount() {
    this.getRooms()
  }
}
</script>

<style lang="scss" scoped>
.room {
  background-color: hsl(0 0 24%);
}
</style>
