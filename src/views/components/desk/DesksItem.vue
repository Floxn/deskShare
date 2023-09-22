<template>
  {{ desk }}
  <div class="desk" v-if="!deskData.editMode" @dblclick="enableEditMode(deskData.id)">
    <h2 class="desk-title">
      {{ deskData.name }}
    </h2>
    <div class="desk-displays">
      {{ deskData.displays }}
    </div>
    <div class="desk-dockingstation">
      {{ deskData.dockingstation }}
    </div>
    <div class="desk-special-information">
      {{ deskData.specialInformation }}
    </div>
    <div class="desk-room-id">
      {{ deskData.roomId }}
    </div>
    <button class="desk-edit" v-if="!deskData.editMode" @click="enableEditMode(deskData.id)">
      <vue-feather type="edit" />
    </button>
    <button class="desk-delete" v-if="!deskData.editMode" @click="deleteDesk(deskData.id)">
      <vue-feather type="trash" />
    </button>
  </div>
  <!-- TODO Edit funktioniert noch nicht  -->
  <form v-else @submit.prevent="editDesk(deskData.id)" class="desk">
    <input type="text" v-model="$props.deskData.name" class="desk-title" />
    <input type="text" v-model="$props.deskData.displays" class="desk-displays" />
    <input type="text" v-model="$props.deskData.dockingstation" class="desk-dockingstation" />
    <input
      type="text"
      v-model="$props.deskData.specialInformation"
      class="desk-special-information"
    />
    <input type="number" v-model="$props.deskData.roomId" class="desk-room-id" />
    <button class="desk-save"><vue-feather type="save" /></button>
  </form>
</template>

<script>
import { deleteItem, updateItem } from '@/services/api'
export default {
  name: 'desks-item',
  data() {
    return {}
  },
  props: {
    deskData: Object
  },
  methods: {
    async editDesk(desk) {
      try {
        desk.editMode = false
        await updateItem('/desks', desk)
      } catch (error) {
        console.log('Fehler beim Speichern der Daten', error)
      }
    },

    async deleteDesk(desk) {
      try {
        await deleteItem('/desks', desk)
        this.desksData = this.desksData.filter((item) => item.id !== desk.id)
      } catch (error) {
        console.log('Fehler beim Löschen der Daten', error)
      }
    },

    enableEditMode(desk) {
      desk.editMode = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.desk {
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

    &-displays {
      grid-column: var(--_column-displayss);
    }

    &-dockingstation {
      grid-column: var(--_column-dockingstation);
    }

    &-special-information {
      grid-column: var(--_column-special-information);
    }

    &-room-id {
      grid-column: var(--_column-room-id);
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
