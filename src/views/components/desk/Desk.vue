<template>
  {{ $props.desk }}
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
    <button class="button edit" v-if="!deskData.editMode" @click="enableEditMode(deskData.id)">
      edit
    </button>
    <button class="button delete" v-if="!deskData.editMode" @click="deleteDesk(deskData.id)">
      delete
    </button>
  </div>
  <form v-else @submit.prevent="editDesk(deskData.id)" class="desk">
    <input type="text" v-model="deskData.name" class="desk-title" />
    <input type="text" v-model="deskData.displays" class="desk-displays" />
    <input type="text" v-model="deskData.dockingstation" class="desk-dockingstation" />
    <input type="text" v-model="deskData.specialInformation" class="desk-special-information" />
    <input type="number" v-model="deskData.roomId" class="desk-room-id" />
    <button class="button save">save</button>
  </form>
</template>

<script>
export default {
  name: 'desks-list',
  data() {
    return {
      deskData: this.deskId
    }
  },
  props: {
    desk: Object
  },
  methods: {
    async editDesk(deskId) {
      try {
        const response = await fetch(`http://localhost:3000/desks/${deskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deskId)
        })
        const data = await response.json()
        deskId.editMode = false
      } catch (error) {
        console.log('Fehler beim Speichern der Daten', error)
      }
    },

    async deleteDesk(deskId) {
      try {
        const response = await fetch(`http://localhost:3000/desks/${deskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // TODO braucht es hier überhaupt die const data? oder kann hier schon schluss sein?
        const data = await response.json()
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

.desks {
  --_grid-template-columns: 2fr repeat(4, 1fr) repeat(2, 100px);
  --_gap: $spacer;
  --_column-title: 1 / 2;
  --_column-displays: 2 / 3;
  --_column-dockingstation: 3 / 4;
  --_column-special-information: 4 / 5;
  --_column-room-id: 5 / 6;
  --_column-btn-edit-save: 6 / 7;
  --_column-btn-delete: 7 / 8;

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

  &-displays {
    grid-column: var(--_column-displays);
  }

  &-dockingstation {
    grid-column: var(--_column-dockingstation);
  }

  &-room-id {
    grid-column: var(--_column-room-id);
  }

  &-special-information {
    grid-column: var(--_column-special-information);
  }
}

.desk {
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
