<template>
  <div class="desk" v-if="!deskData.editMode" @dblclick="enableEditMode(deskData)">
    <h2 class="desk-title">
      {{ deskData.title }}
    </h2>
    <div class="desk-displays">
      <vue-feather type="monitor" /> {{ deskData.desk_displays.length }}
    </div>
    <div class="desk-dockingstation">
      <vue-feather type="hard-drive" /> {{ deskData.dockingstation.title }}
    </div>
    <div class="desk-special-information">
      {{ deskData.specialInformation }}
    </div>
    <div class="desk-room-id">
      {{ deskData.room.title }}
    </div>
    <button class="desk-edit" v-if="!deskData.editMode" @click="enableEditMode(deskData)">
      <vue-feather type="edit" />
    </button>
    <button class="desk-delete" v-if="!deskData.editMode" @click="deleteDesk(deskData)">
      <vue-feather type="trash" />
    </button>
  </div>
  <form v-else @submit.prevent="editDesk($event, deskData.id)" class="desk">
    <input type="text" name="name" :value="deskData.title" class="desk-title" />
    <select name="displays" class="desk-displays" multiple>
      <option
        v-for="display in deskData.desk_displays"
        :key="display.displays_id.id"
        :value="display.displays_id.title"
      >
        {{ display.displays_id.title }}
      </option>
    </select>
    <!--
    <input type="text" name="displays" :value="deskData.displays" class="desk-displays" />
-->
    <select name="dockingstation" class="desk-dockingstation">
      <option
        v-for="dockingstation in this.dockingstations.data"
        :key="dockingstation.id"
        :value="dockingstation.id"
      >
        {{ dockingstation.title }}
      </option>
    </select>
    <!--    <input
      type="text"
      name="dockingstation"
      :value="deskData.dockingstation.title"
      class="desk-dockingstation"
    />-->
    <input
      type="text"
      name="specialInformation"
      :value="deskData.specialInformation"
      class="desk-special-information"
    />
    <input type="number" name="roomId" :value="deskData.room.title" class="desk-room-id" />
    <button class="desk-save"><vue-feather type="save" /></button>
  </form>
</template>

<script>
import { getAll } from '@/services/api'

export default {
  name: 'desks-item',
  data() {
    return {
      dockingstations: []
    }
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
        console.error('Fehler beim Speichern der Daten', error)
      }
    },

    async deleteDesk(desk) {
      try {
        this.$emit('delete-desk', desk)
      } catch (error) {
        console.error('Fehler beim Löschen der Daten', error)
      }
    },

    async getDockingstations() {
      try {
        this.dockingstations = await getAll('/dockingstations')
      } catch (error) {
        console.error('Feler beim Laden der Daten', error)
      }
    },

    enableEditMode(desk) {
      this.$emit('edit-mode-changed', desk.id)
      this.getDockingstations()
    },

    changeDockingstationForDesk() {
      console.log(event.target)
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

  &-displays,
  &-dockingstation {
    display: flex;
    align-items: center;
  }
}
</style>
