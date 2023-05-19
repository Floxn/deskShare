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
      // event.preventDefault()
      console.log('Form send')

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
  }
}
</script>

<style lang="scss" scoped></style>
