<template>
  <navigation />
  <div class="container">
    <div class="row desk-create">
      <div class="column">
        <!--
        TODO Mentoring: Schreibt man für die H1 besser einen Compnente die man dann an der Stelle einfügt? Bzw. sollte der Grundaufbau vom Layout her immer gleich sein. Der findet dann außerhalb dieser Componente statt, wie wird der Seitentiel dann übergeben? Also wenn Z.B. in der <APP> der Grundaufbau wäre
-->
        <h1 class="page-title">Create desk</h1>
        <form @submit.prevent="handleForm" class="desk-create-form">
          <fieldset>
            <div class="desk-create-name">
              <label for="name">Name</label>
              <input id="name" type="text" v-model="formData.name" />
            </div>
            <div class="desk-create-floor">
              <label for="displays">Bildschirme</label>
              <select name="displays" id="displays" v-model="formData.displays">
                <option value="">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div class="desk-create-noiselevel">
              <label for="dockingstation">Dockingstation</label>
              <select name="dockingstation" id="dockingstation" v-model="formData.dockingstation">
                <option value="">-</option>
                <option value="silent">HP G2</option>
                <option value="normal">HP G3</option>
                <option value="loud">HP G5</option>
              </select>
            </div>
            <div class="desk-create-special-information">
              <label for="specialInformation">Weitere Infos</label>
              <textarea id="specialInformation" type="text" v-model="formData.specialInformation" />
            </div>
            <div class="desk-create-room-id">
              <label for="roomId">Raum</label>
              <select name="roomId" id="roomId" v-model="formData.roomId">
                <option value="">-</option>
                <option :value="room.id" v-for="room in roomsData">{{ room.name }}</option>
              </select>
            </div>
            <button class="button">Arbeitsplatz hinzufügen</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/views/components/Navigation.vue'

export default {
  data() {
    return {
      formData: {
        name: '',
        displays: '',
        dockingstation: '',
        specialInformation: '',
        roomId: ''
      },
      roomsData: []
    }
  },
  components: {
    navigation: Navigation
  },
  methods: {
    handleForm() {
      fetch('http://localhost:3000/desks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      })
        .then((response) => response.json())
        .then(() => {
          this.formData.name = ''
          this.formData.displays = ''
          this.formData.dockingstation = ''
          this.formData.specialInformation = ''
          this.formData.roomId = ''
        })
        .catch((error) => console.error(error))
    },

    async getRooms() {
      const response = await fetch('http://localhost:3000/rooms')
      const rooms = await response.json()
      this.roomsData = rooms
    }
  },

  beforeMount() {
    this.getRooms()
  }
}
</script>

<style lang="scss" scoped></style>
