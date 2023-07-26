<template>
  <div class="rooms">
    <div class="rooms-head">
      <div class="rooms-title">Name</div>
      <div class="rooms-floor">Stockwerk</div>
      <div class="rooms-noiselevel">Lautstärke</div>
    </div>
    <div class="room" v-for="room in roomsData">
      <h2 class="room-title">
        {{ room.name }}
      </h2>
      <div class="room-floor">
        {{ room.floor }}
      </div>
      <div class="room-noiselevel">
        {{ room.noiseLevel }}
      </div>
      <button class="button edit">edit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rooms-list',
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
  --_grid-template-columns: 2fr 1fr 1fr 100px;
  --_gap: $spacer;
  --_column-title: 1 / 2;
  --_column-floor: 2 / 3;
  --_column-noiselevel: 3 / 4;
  --_column-button: 4 / 5;

  @supports (not (grid-template-columns: subgrid)) {
    display: flex;
    flex-direction: column;
  }
  @supports (grid-template-columns: subgrid) {
    display: grid;
    grid-template-columns: var(--_grid-template-columns);
    gap: var(--_gap);
  }
  &-head {
    display: grid;
    grid-template-columns: var(--_grid-template-columns);
    gap: var(--_gap);
    align-items: baseline;
    padding-bottom: calc($spacer * 0.5);
    margin-bottom: calc($spacer * 2);
    border-bottom: 1px solid $primary-color;
    color: $primary-color;
  }
  &-title {
    grid-column: var(--_column-title);
    font-size: $h2-font-size;
  }

  &-floor {
    grid-column: var(--_column-floor);
  }

  &-noiselevel {
    grid-column: var(--_column-noiselevel);
  }
}

.room {
  display: grid;
  align-items: center;
  transition: $transition;
  padding-block: calc($spacer / 2);

  &-title {
    font-size: $h3-font-size;
  }

  @supports (not (grid-template-columns: subgrid)) {
    grid-template-columns: var(--_grid-template-columns);
    margin-bottom: 1rem;
  }
  @supports (grid-template-columns: subgrid) {
    grid-column: 1 / 5;
    grid-template-columns: subgrid;
    &-title {
      grid-column: var(--_column-title);
    }

    &-floor {
      grid-column: var(--_column-floor);
    }

    &-noiselevel {
      grid-column: var(--_column-noiselevel);
    }

    button {
      grid-column: var(--_column-button);
    }
  }

  &:hover,
  &:focus-visible {
    cursor: pointer;
    @include linear-gradient;
  }
}
</style>
