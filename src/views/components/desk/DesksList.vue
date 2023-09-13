<template>
  <div class="desks">
    <div class="desks-head">
      <div class="desks-title">Name</div>
      <div class="desk-displays">Displays</div>
      <div class="desks-dockingstation">Dockingstation</div>
      <div class="desks-special-information">Extra Info</div>
      <div class="desks-room-id">Raum</div>
    </div>
    <!-- TODO Schreibt man das so mit dem <template> und dem v-if? Sieht für mich noch irgendwie komisch aus-->
    <template v-for="desk in desksData" :key="desk.id">
      <div class="desk" v-if="!desk.editMode" @dblclick="enableEditMode(desk)">
        <h2 class="desk-title">
          {{ desk.name }}
        </h2>
        <div class="desk-displays">
          {{ desk.displays }}
        </div>
        <div class="desk-dockingstation">
          {{ desk.dockingstation }}
        </div>
        <div class="desk-special-information">
          {{ desk.specialInformation }}
        </div>
        <div class="desk-room-id">
          {{ desk.roomId }}
        </div>
        <button class="button edit" v-if="!desk.editMode" @click="enableEditMode(desk)">
          edit
        </button>
        <button class="button delete" v-if="!desk.editMode" @click="deleteDesk(desk)">
          delete
        </button>
      </div>
      <form v-else @submit.prevent="editDesk(desk)" class="desk">
        <input type="text" v-model="desk.name" class="desk-title" />
        <input type="text" v-model="desk.displays" class="desk-displays" />
        <input type="text" v-model="desk.dockingstation" class="desk-dockingstation" />
        <input type="text" v-model="desk.specialInformation" class="desk-special-information" />
        <input type="number" v-model="desk.roomId" class="desk-room-id" />
        <button class="button save">save</button>
      </form>
    </template>
  </div>
</template>

<script>
export default {
  name: 'desks-list',
  data() {
    return {
      desksData: []
    }
  },
  methods: {
    async getdesks() {
      try {
        const response = await fetch('http://localhost:3000/desks')
        const desks = await response.json()
        this.desksData = desks
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    },

    async editDesk(desk) {
      try {
        const response = await fetch(`http://localhost:3000/desks/${desk.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(desk)
        })
        const data = await response.json()
        desk.editMode = false
      } catch (error) {
        console.log('Fehler beim Speichern der Daten', error)
      }
    },

    async deleteDesk(desk) {
      try {
        const response = await fetch(`http://localhost:3000/desks/${desk.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.log('Fehler beim Löschen der Daten', error)
      }
    },

    enableEditMode(desk) {
      desk.editMode = true
    }
  },
  beforeMount() {
    this.getdesks()
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
