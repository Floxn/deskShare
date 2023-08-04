<template>
  <div class="user">
    <h1 class="user-name">
      {{ `${userData.firstname} ${userData.lastname}` }}
    </h1>
    <div class="user-eMail">
      {{ userData.eMail }}
    </div>
    <input type="password" class="user-password" v-bind="userData.eMail" />
    <input
      type="checkbox"
      class="user-isAdmin"
      :checked="userData.isAdmin"
      v-bind="userData.eMail"
    />
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
        const user = response.json()
        this.userData = user
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    }
  },
  beforeMount() {
    const userId = Number(this.$route.query.id)
    this.getUser(userId)
  }
}
</script>

<style lang="scss" scoped></style>
