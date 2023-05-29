<template>
  <div class="rooms-wrapper">
    <div class="rooms-head">
      <h2 class="rooms-title">Rooms</h2>
    </div>
    <div class="rooms">
      <div class="room" v-for="room in roomsData">
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
@import '@/assets/scss/variables';

.rooms {
  @supports (not (grid-template-columns: subgrid)) {
    display: flex;
    flex-direction: column;
  }
  @supports (grid-template-columns: subgrid) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 100px;
    gap: 1rem;
  }
  &-head {
    border-bottom: 1px solid $primary-color;
  }
}
.room {
  display: grid;
  align-items: center;
  transition: $transition;

  @supports (not (grid-template-columns: subgrid)) {
    grid-template-columns: 2fr 1fr 1fr 100px;
    margin-bottom: 1rem;
  }
  @supports (grid-template-columns: subgrid) {
    grid-column: 1 / 5;
    grid-template-columns: subgrid;
    &-title {
      grid-column: 1 / 2;
    }

    &-id {
      grid-column: 2 / 3;
    }

    &-noiselevel {
      grid-column: 3 / 4;
    }

    button {
      grid-column: 4 / 5;
    }
  }

  &:hover,
  &:focus-visible {
    cursor: pointer;
    @include linear-gradient;
  }
}
</style>
