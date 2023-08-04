<template>
  <div class="room">
    <h1 class="room-title">
      {{ roomData.name }}
    </h1>
    <div class="room-floor">
      {{ roomData.floor }}
    </div>
    <div class="room-noiselevel">
      {{ roomData.noiseLevel }}
    </div>
    <button class="button edit">edit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomData: {}
    }
  },
  methods: {
    async getRoom(roomId) {
      try {
        const response = await fetch(`http://localhost:3000/rooms/${roomId}`)
        const room = await response.json()
        this.roomData = room
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    }
  },
  beforeMount() {
    const roomId = Number(this.$route.params.roomId)
    this.getRoom(roomId)
  }
}
</script>

<style lang="scss" scoped></style>
