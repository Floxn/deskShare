<!--
die Lösung sieht smarter aus. Den gewollten Raum mit .filter herausnehmen
https://stackoverflow.com/questions/60715099/how-can-i-implement-v-for-with-v-if?rq=3
-->
<template>
  <navigation />
  <template v-for="room in roomsData">
    <div class="room" v-if="room.id === roomQueryId" :key="room.id">
      <h1 class="room-title">
        {{ room.name }}
      </h1>
      <div class="room-floor">
        {{ room.floor }}
      </div>
      <div class="room-noiselevel">
        {{ room.noiseLevel }}
      </div>
      <button class="button edit">edit</button>
    </div>
  </template>
</template>

<script>
import Navigation from '@/views/components/Navigation.vue'

export default {
  data() {
    return {
      roomsData: [],
      roomQueryId: undefined
    }
  },
  components: {
    navigation: Navigation
  },
  methods: {
    async getRooms() {
      try {
        const response = await fetch('http://localhost:3000/rooms')
        const rooms = await response.json()
        this.roomsData = rooms
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    }
  },
  mounted() {
    this.roomQueryId = Number(this.$route.query.id)
  },
  beforeMount() {
    this.getRooms()
  }
}
</script>

<style lang="scss" scoped></style>
