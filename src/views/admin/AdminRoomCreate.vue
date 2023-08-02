<template>
  <div class="container">
    <div class="row room-create">
      <div class="column">
        <!--
        TODO Mentoring: Schreibt man für die H1 besser einen Compnente die man dann an der Stelle einfügt? Bzw. sollte der Grundaufbau vom Layout her immer gleich sein. Der findet dann außerhalb dieser Componente statt, wie wird der Seitentiel dann übergeben? Also wenn Z.B. in der <APP> der Grundaufbau wäre
-->
        <h1 class="page-title">Create Room</h1>
        <form @submit.prevent="addRoom" class="room-create-form">
          <fieldset>
            <div class="room-create-name">
              <label for="name">Name</label>
              <input id="name" type="text" v-model="room.name" />
            </div>
            <div class="room-create-floor">
              <label for="floor">Stockwerk</label>
              <select name="floor" id="floor" v-model="room.floor">
                <option value="">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div class="room-create-noiselevel">
              <label for="noiselevel">Lautstärke</label>
              <select name="noiselevel" id="noiselevel" v-model="room.noiseLevel">
                <option value="">-</option>
                <option value="silent">leise</option>
                <option value="normal">normal</option>
                <option value="loud">laut</option>
              </select>
            </div>
            <button class="button">Raum hinzufügen</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: {
        name: '',
        floor: '',
        noiseLevel: ''
      }
    }
  },
  methods: {
    async addRoom() {
      try {
        const response = await fetch('http://localhost:3000/room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.room)
        })
        const data = await response.json()
        this.room.name = ''
        this.room.floor = ''
        this.room.noiseLevel = ''
      } catch (error) {
        console.log('Fehler beim Speichern der Daten', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
