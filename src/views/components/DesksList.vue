<template>
  <div class="desks">
    <div class="desks-head">
      <div class="desks-title">Name</div>
      <div class="desk-displays">Displays</div>
      <div class="desks-dockingstation">Dockingstation</div>
      <div class="desks-special-information">Dockingstation</div>
    </div>
    <div class="desk" v-for="desk in desksData">
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
      <button class="button edit">edit</button>
    </div>
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
      const response = await fetch('http://localhost:3000/desks')
      const desks = await response.json()
      this.desksData = desks
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
  --_grid-template-columns: 2fr 1fr 1fr 1fr 100px;
  --_gap: $spacer;
  --_column-title: 1 / 2;
  --_column-displays: 2 / 3;
  --_column-dockingstation: 3 / 4;
  --_column-special-information: 4 / 5;
  --_column-button: 5 / 6;

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

  &-special-information {
    grid-column: var(--_column-special-information);
  }
}

.desk {
  display: grid;
  align-items: center;
  transition: $transition;
  padding-block: calc($spacer / 2);

  &-title {
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
