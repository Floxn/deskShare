<template>
  <div class="room" v-for="rooms in roomsData">
    <h2 class="room-title">{{ rooms.name }}</h2>
    {{ rooms.id }}
    {{ rooms.noiseLevel }}
    <button class="edit">edit</button>
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

<style lang="scss" scoped></style>
