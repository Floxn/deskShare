<template>
  <div class="rooms">
    <div class="rooms-head">
      <div class="rooms-title">Name</div>
      <div class="rooms-floor">Stockwerk</div>
      <div class="rooms-noiselevel">Lautstärke</div>
    </div>
    <template v-for="room in roomsData" :key="room.id">
      <div v-if="!room.editMode" @dblclick.prevent="enableEditMode(room)" class="room">
        <h2 class="room-title">
          {{ room.name }}
        </h2>
        <div class="room-floor">
          {{ room.floor }}
        </div>
        <div class="room-noiselevel">
          {{ room.noiseLevel }}
        </div>
        <button class="button edit" @click.prevent="enableEditMode(room)">edit</button>
        <button class="button delete" @click="deleteRoom(room)">delete</button>
      </div>
      <form v-else @submit.prevent="editRoom(room)" class="room">
        <input type="text" v-model="room.name" class="room-title" />
        <input type="text" v-model="room.floor" class="room-floor" />
        <input type="text" v-model="room.noiseLevel" class="room-noiselevel" />
        <button class="button save">save</button>
      </form>
    </template>
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
      try {
        const response = await fetch('http://localhost:3000/rooms')
        const rooms = await response.json()
        this.roomsData = rooms
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    },

    async editRoom(room) {
      try {
        const response = await fetch(`http://localhost:3000/rooms/${room.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(room)
        })
        const data = await response.json()
        room.editMode = false
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    },

    async deleteRoom(room) {
      try {
        const response = await fetch(`http://localhost:3000/rooms/${room.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // TODO braucht es hier überhaupt die const data? oder kann hier schon schluss sein?
        const data = await response.json()
      } catch (error) {
        console.error('Fehler beim Löschen der Daten', error)
      }
    },

    enableEditMode(room) {
      room.editMode = true
    }
  },
  beforeMount() {
    this.getRooms()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.rooms {
  --_grid-template-columns: 2fr repeat(2, 1fr) repeat(2, 100px);
  --_gap: $spacer;
  --_column-title: 1 / 2;
  --_column-floor: 2 / 3;
  --_column-noiselevel: 3 / 4;
  --_column-button: 4 / 5;
  --_column-btn-delete: 6 / 7;

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
  @include list-view;

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
      .edit,
      .save {
        grid-column: var(--_column-btn-edit-save);
      }

      .delete {
        grid-column: var(--_column-btn-delete);
      }
    }
  }
}
</style>
