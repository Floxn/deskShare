<template>
  <div class="user">
    <h1 class="user-name">
      {{ `${userData.firstname} ${userData.lastname}` }}
    </h1>
    <div class="user-eMail">
      {{ userData.eMail }}
    </div>
    {{ userData.password }}
    <input type="password" class="user-password" v-model="userData.password" />
    <div class="user-isAdmin">
      <input
        type="checkbox"
        class="user-isAdmin-input"
        id="isAdmin"
        :checked="userData.isAdmin"
        v-model="userData.isAdmin"
      />
      <label for="isAdmin">isAdmin</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {}
    }
  },
  methods: {
    async getUser(userId) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`)
        const user = await response.json()
        this.userData = user
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    }
  },
  beforeMount() {
    const userId = Number(this.$route.params.userId)
    this.getUser(userId)
  }
}
</script>

<style lang="scss" scoped></style>
