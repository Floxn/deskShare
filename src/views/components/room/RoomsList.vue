<template>
  <div class="rooms">
    <div class="rooms-head">
      <div class="rooms-title">Name</div>
      <div class="rooms-floor">Stockwerk</div>
      <div class="rooms-noiselevel">Lautstärke</div>
    </div>
    <template v-if="roomsData.data.length > 0">
      <template v-for="room in roomsData.data" :key="room.id">
        <RoomsItem
          :roomData="room"
          @edit-mode-changed="handleEditMode"
          @update-room-data="handleRoomData"
          @delete-room="handleDeleteRoom"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { getAll, updateItem, deleteItem } from '@/services/api'
import RoomsItem from '@/views/components/room/RoomsItem.vue'

export default {
  name: 'rooms-list',
  data() {
    return {
      roomsData: []
    }
  },
  components: {
    RoomsItem
  },
  methods: {
    handleEditMode(id) {
      const currentRoom = this.roomsData.data.find((item) => item.id === id)
      currentRoom.editMode = true
    },

    handleRoomData(formData, roomId) {
      const currentRoom = this.roomsData.data.find((item) => item.id === roomId)

      /* iterate over formData entries to get Desk updated */
      for (const input of formData.entries()) {
        /* TODO das tut nicht; wie kann man das eleganter schreiben */
        /*
        currentRoom.input[0] = input[1]
*/
        if (input[0] === 'title') {
          currentRoom.title = input[1]
        }

        if (input[0] === 'floor') {
          currentRoom.floor = input[1]
        }

        if (input[0] === 'noiseLevel') {
          currentRoom.noiseLevel = input[1]
        }
      }
      currentRoom.editMode = false

      this.updateRoom(currentRoom)
    },

    async handleDeleteRoom(room) {
      try {
        await deleteItem('/rooms', room)
        this.roomsData.data = this.roomsData.data.filter((item) => item.id !== room.id)
      } catch (error) {
        console.error('Fehler beim Löschen der Daten', error)
      }
    },

    async updateRoom(currentRoom) {
      try {
        await updateItem('/rooms', currentRoom)
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    }
  },
  created() {
    ;(async () => {
      this.roomsData = await getAll('/rooms')
    })()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.rooms {
  --_grid-template-columns: 2fr repeat(2, 1fr) repeat(2, 45px);
  --_gap: $spacer;
  --_column-title: 1 / 2;
  --_column-floor: 2 / 3;
  --_column-noiselevel: 3 / 4;
  --_column-btn-edit-save: 4 / 5;
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
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
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
</style>
