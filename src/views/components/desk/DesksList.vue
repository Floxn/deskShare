<template>
  <div class="desks">
    <div class="desks-head">
      <div class="desks-title">Name</div>
      <div class="desk-displays">Displays</div>
      <div class="desks-dockingstation">Dockingstation</div>
      <div class="desks-special-information">Extra Info</div>
      <div class="desks-room-id">Raum</div>
    </div>
    <template v-if="desksData.data?.length > 0">
      <template v-for="desk in desksData.data" :key="desk.id">
        <DesksItem
          :deskData="desk"
          @edit-mode-changed="handleEditMode"
          @update-desk-data="handleDeskData"
          @delete-desk="handleDeleteDesk"
        />
      </template>
    </template>
  </div>
</template>

<script>
import DesksItem from '@/views/components/desk/DesksItem.vue'
import { deleteItem, getAll, updateItem } from '@/services/api'

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
    handleEditMode(id) {
      const currentDesk = this.desksData.data.find((item) => item.id === id)
      currentDesk.editMode = true
    },
    handleDeskData(formData, deskId) {
      const currentDesk = this.desksData.data.find((item) => item.id === deskId)

      /* iterate over formData entries to get Desk updated */
      for (const input of formData.entries()) {
        /* TODO das tut nicht; wie kann man das eleganter schreiben
        currentDesk.input[0] = input[1]
*/
        if (input[0] === 'title') {
          currentDesk.title = input[1]
        }

        if (input[0] === 'displays') {
          currentDesk.displays = input[1]
        }

        if (input[0] === 'dockingstation') {
          currentDesk.dockingstation = input[1]
        }

        if (input[0] === 'specialInformation') {
          currentDesk.specialInformation = input[1]
        }

        if (input[0] === 'roomId') {
          currentDesk.roomId = input[1]
        }
      }
      currentDesk.editMode = false
      console.log(currentDesk)
      this.updateDesk(currentDesk)
    },

    async handleDeleteDesk(desk) {
      try {
        await deleteItem('/desks', desk)
        this.desksData = this.desksData.data.filter((item) => item.id !== desk.id)
      } catch (error) {
        console.error('Fehler beim Löschen der Daten', error)
      }
    },

    async updateDesk(deskData) {
      try {
        await updateItem('/desks', deskData)
      } catch (error) {
        console.error('Fehler beim Updaten der Daten', error)
      }
    }
  },
  created() {
    ;(async () => {
      this.desksData = await getAll('/desks/?fields=*.*,dockingstation,desk_displays.*.*')
    })()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.desks {
  --_grid-template-columns: 2fr repeat(4, 1fr) repeat(2, 45px);
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
