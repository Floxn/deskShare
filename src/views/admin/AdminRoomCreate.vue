<template>
  <navigation />
  <div class="container">
    <div class="row room-create">
      <div class="column">
        <!--
        TODO Mentoring: Schreibt man für die H1 besser einen Compnente die man dann an der Stelle einfügt? Bzw. sollte der Grundaufbau vom Layout her immer gleich sein. Der findet dann außerhalb dieser Componente statt, wie wird der Seitentiel dann übergeben? Also wenn Z.B. in der <APP> der Grundaufbau wäre
-->
        <h1 class="page-title">Create Room</h1>
        <form @submit.prevent="handleForm" class="room-create-form">
          <fieldset>
            <div class="room-create-name">
              <label for="name">Name</label>
              <input id="name" type="text" v-model="formData.name" />
            </div>
            <div class="room-create-floor">
              <label for="floor">Stockwerk</label>
              <select name="floor" id="floor" v-model="formData.floor">
                <option value="">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div class="room-create-noiselevel">
              <label for="noiselevel">Lautstärke</label>
              <select name="noiselevel" id="noiselevel" v-model="formData.noiseLevel">
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
import Navigation from '@/views/components/Navigation.vue'

export default {
  data() {
    return {
      formData: {
        name: '',
        floor: '',
        noiseLevel: ''
      }
    }
  },
  components: {
    navigation: Navigation
  },
  methods: {
    handleForm() {
      fetch('http://localhost:3000/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      })
        .then((response) => response.json())
        .then(() => {
          this.formData.name = ''
          this.formData.floor = ''
          this.formData.noiseLevel = ''
        })
        .catch((error) => console.error(error))
    }

    /*    TODO Mentoring: funktioniert und schreibt einen neun DB Eintrag. Nur wie bekomm ich die Felder wieder zurückgesetzt?
      async handleForm() {
      const response = await fetch('http://localhost:3000/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      })
      const { formData: name, floor, noiseLevel } = await response.json()
      this.name = name
      this.floor = floor
      this.noiseLevel = noiseLevel
    }*/
  }
}
</script>

<style lang="scss" scoped></style>
