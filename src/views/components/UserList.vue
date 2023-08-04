<template>
  <div class="users">
    <div class="users-head">
      <div class="users-firstName">Vorname</div>
      <div class="users-lastName">Nachname</div>
      <div class="users-eMail">E-Mail</div>
      <div class="users-isAdmin">Admin</div>
    </div>
    <temnplate v-for="user in usersData" :key="user.id">
      <div class="user">
        <!-- TODO hier sollte die User Componente rein kommen, die wird eh gebraucht weil der User sich selbst ja auch bearbeiten können sollte -->
        <h2 class="user-title">
          {{ `${usersData.firstName} ${usersData.lastName}` }}
        </h2>
        <div class="user-eMail">
          {{ usersData.eMail }}
        </div>
      </div>
    </temnplate>
  </div>
</template>

<script>
export default {
  name: 'users-list',
  data() {
    return {
      usersData: []
    }
  },
  methods: {
    async getUsers() {
      try {
        const response = fetch('http://localhost:3000/users')
        const users = (await response).json()
        this.usersData = users
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
