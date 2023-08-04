<template>
  <div class="room">
    <h1 class="room-title">
      {{ roomsData.name }}
    </h1>
    <div class="room-floor">
      {{ roomsData.floor }}
    </div>
    <div class="room-noiselevel">
      {{ roomsData.noiseLevel }}
    </div>
    <button class="button edit">edit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomsData: {}
    }
  },
  methods: {
    async getRooms(roomId) {
      try {
        const response = await fetch(`http://localhost:3000/rooms/${roomId}`)
        const room = await response.json()
        this.roomsData = room
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    }
  },
  beforeMount() {
    const roomId = Number(this.$route.query.id)
    this.getRooms(roomId)
  }
}
</script>

<style lang="scss" scoped></style>
