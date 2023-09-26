<template>
  <div v-if="!roomData.editMode" @dblclick.prevent="enableEditMode(roomData)" class="room">
    <h2 class="room-title">
      {{ roomData.title }}
    </h2>
    <div class="room-floor">
      {{ roomData.floor }}
    </div>
    <div class="room-noiselevel">
      {{ roomData.noiseLevel }}
    </div>
    <button class="room-edit" @click.prevent="enableEditMode(roomData)">
      <vue-feather type="edit" />
    </button>
    <button class="room-delete" @click="deleteRoom(roomData)">
      <vue-feather type="trash" />
    </button>
  </div>
  <form v-else @submit.prevent="editRoom($event, roomData.id)" class="room">
    <input type="text" name="title" :value="roomData.title" class="room-title" />
    <input type="text" name="floor" :value="roomData.floor" class="room-floor" />
    <input type="text" name="noiselevel" :value="roomData.noiseLevel" class="room-noiselevel" />
    <button class="room-save"><vue-feather type="save" /></button>
  </form>
</template>

<script>
export default {
  name: 'rooms-item',
  data() {
    return {}
  },
  props: {
    roomData: Object
  },
  methods: {
    async editRoom(event, roomId) {
      try {
        const formData = new FormData(event.target)
        this.$emit('update-room-data', formData, roomId)
      } catch (error) {
        console.error('Fehler beim Speichern der Daten', error)
      }
    },

    async deleteRoom(room) {
      try {
        this.$emit('delete-room', room)
      } catch (error) {
        console.error('Fehler beim Löschen der Daten', error)
      }
    },

    enableEditMode(room) {
      this.$emit('edit-mode-changed', room.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.room {
  @include list-view;

  @supports (not (grid-template-columns: subgrid)) {
    grid-template-columns: var(--_grid-template-columns);
    margin-bottom: 1rem;
  }

  @supports (grid-template-columns: subgrid) {
    grid-column: 1 / -1;
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

    &-edit,
    &-save {
      grid-column: var(--_column-btn-edit-save);
    }
    &-delete {
      grid-column: var(--_column-btn-delete);
    }

    button {
      &:hover,
      &:focus-visible {
        color: $primary-color;
        cursor: pointer;
      }
    }
  }
}
</style>
