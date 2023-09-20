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
      {{ desk }}
      <DesksItem deskId="{{desk}}" />
    </template>
  </div>
</template>

<script>
import DesksItem from '@/views/components/desk/DesksItem.vue'

export default {
  name: 'desks-list',
  data() {
    return {
      desksData: []
    }
  },
  components: {
    DesksItem
  },
  methods: {
    async getdesks() {
      try {
        const response = await fetch('http://localhost:3000/desks')
        const desks = await response.json()
        this.desksData = desks
        console.log()
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
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
</style>
