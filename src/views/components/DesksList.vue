<template>
  <div class="desks">
    <div class="desks-head">
      <div class="desks-title">Name</div>
      <div class="desk-displays">Displays</div>
      <div class="desks-dockingstation">Dockingstation</div>
      <div class="desks-special-information">Extra Info</div>
      <div class="desks-room-id">Raum</div>
    </div>
    <template v-for="(desk, index) in desksData" :key="index">
      <div class="desk" v-if="!desk.editMode">
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
      </div>
      <form v-else @submit.prevent="saveDeskInputs(desk)" class="desk">
        <input v-model="desk.name" class="desk-title" />
        <input v-model="desk.displays" class="desk-displays" />
        <input v-model="desk.dockingstation" class="desk-dockingstation" />
        <input v-model="desk.specialInformation" class="desk-special-information" />
        <input v-model="desk.roomId" class="desk-room-id" />
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
      desksData: [],
      formData: {
        name: '',
        displays: '',
        dockingstation: '',
        specialInformation: '',
        roomId: ''
      }
    }
  },
  methods: {
    async getdesks() {
      const response = await fetch('http://localhost:3000/desks')
      const desks = await response.json()
      this.desksData = desks
    },

    /* TODO-Mentoring bisher wird hier ein neuer Datensatz geschrieben. Wie kann ich ein vorhandenen Datensatz ändern */
    handleForm() {
      fetch('http://localhost:3000/desks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      })
        //.then((response) => response.json())
        .catch((error) => console.error(error))
    },
    enableEditMode(desk) {
      desk.editMode = true
    },
    saveDeskInputs(desk) {
      /* TODO hier muss per api POST method die geänderten Daten and den JSON-Server geschickt werden */
      this.handleForm()
      desk.editMode = false
    }
  },
  beforeMount() {
    this.getdesks()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.desks {
  --_grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
  --_gap: $spacer;
  --_column-title: 1 / 2;
  --_column-displays: 2 / 3;
  --_column-dockingstation: 3 / 4;
  --_column-special-information: 4 / 5;
  --_column-room-id: 5 / 6;
  --_column-button: 6 / 7;

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
  display: grid;
  gap: calc($spacer / 2);
  align-items: center;
  transition: $transition;
  padding-block: calc($spacer / 2);

  > input {
    margin-bottom: 0;
    background-color: lighten($background-color-lighter, 35%);
    color: $background-color;
  }

  &-title:not(input) {
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
