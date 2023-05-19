<template>
  <div>
    <h1>Create Room</h1>
    <form @submit.prevent="handleForm">
      <div>
        <label for="name">Name</label>
        <input id="name" type="text" v-model="formData.name" />
        <pre>
        {{ $data }}
          </pre
        >
      </div>
      <div>
        <label for="floor">Stockwerk</label>
        <select name="floor" id="floor" v-model="formData.floor">
          <option value="">-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <label for="noiselevel">Lautstärke</label>
        <select name="noiselevel" id="noiselevel" v-model="formData.noiseLevel">
          <option value="">-</option>
          <option value="silent">leise</option>
          <option value="normal">normal</option>
          <option value="loud">laut</option>
        </select>
      </div>
      <button>send</button>
    </form>
  </div>
</template>

<script>
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

    /*    TODO Mentoring funktinoiert und schreibt einen neun DB Eintrag. Nur wie bekomm ich die felder wieder zurückgesetzt?
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
