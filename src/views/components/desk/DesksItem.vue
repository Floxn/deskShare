<template>
  <div class="desk" v-if="!deskData.editMode" @dblclick="enableEditMode(deskData)">
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
    <button class="desk-edit" v-if="!deskData.editMode" @click="enableEditMode(deskData)">
      <vue-feather type="edit" />
    </button>
    <button class="desk-delete" v-if="!deskData.editMode" @click="deleteDesk(deskData)">
      <vue-feather type="trash" />
    </button>
  </div>
  <form v-else @submit.prevent="editDesk($event, deskData.id)" class="desk">
    <input type="text" name="name" :value="deskData.name" class="desk-title" />
    <input type="text" name="displays" :value="deskData.displays" class="desk-displays" />
    <input
      type="text"
      name="dockingstation"
      :value="deskData.dockingstation"
      class="desk-dockingstation"
    />
    <input
      type="text"
      name="specialInformation"
      :value="deskData.specialInformation"
      class="desk-special-information"
    />
    <input type="number" name="roomId" :value="deskData.roomId" class="desk-room-id" />
    <button class="desk-save"><vue-feather type="save" /></button>
  </form>
</template>

<script>
export default {
  name: 'desks-item',
  data() {
    return {}
  },
  props: {
    deskData: Object
  },
  methods: {
    /* TODO müssen die hier noch asyncron sein? Eher nicht oder? Was macht das für einen Unterschied? */
    async editDesk(event, deskId) {
      try {
        const formData = new FormData(event.target)
        this.$emit('update-desk-data', formData, deskId)
      } catch (error) {
        console.log('Fehler beim Speichern der Daten', error)
      }
    },

    async deleteDesk(desk) {
      try {
        this.$emit('delete-desk', desk)
      } catch (error) {
        console.log('Fehler beim Löschen der Daten', error)
      }
    },

    enableEditMode(desk) {
      this.$emit('edit-mode-changed', desk.id)
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
