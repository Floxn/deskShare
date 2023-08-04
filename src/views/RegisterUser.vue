<template>
  <div class="container">
    <div class="row user-create">
      <div class="column">
        <h1 class="page-title">Create User</h1>
        <form @submit.prevent="addUser" class="user-create-form">
          <fieldset>
            <div class="user-create-firstName">
              <label for="firstName">Vorname</label>
              <input id="firstName" type="text" v-model="user.firstName" />
            </div>
            <div class="user-create-lastName">
              <label for="lastName">Nachname</label>
              <input id="lastName" type="text" v-model="user.lastName" />
            </div>
            <div class="user-create-email">
              <label for="email">E-Mail Adresse</label>
              <input type="email" id="email" v-model="user.eMail" />
            </div>
            <div class="user-create-password">
              <label for="password">Passwort</label>
              <input type="password" id="password" v-model="user.password" />
            </div>
            <div class="user-create-isAdmin">
              <input type="checkbox" id="isAdmin" v-model="user.isAdmin" />
              <label for="isAdmin">Ist Admin</label>
            </div>
            <button class="button">User registrieren</button>
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
      user: {
        firstName: '',
        lastName: '',
        eMail: '',
        password: '',
        isAdmin: false,
        bookings: []
      }
    }
  },
  methods: {
    async addUser() {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        })
        const data = await response.json()
        this.user.firstName = ''
        this.user.lastName = ''
        this.user.password = ''
        this.user.eMail = ''
        this.user.isAdmin = false
        this.user.bookings = []
      } catch (error) {
        console.log('Fehler beim Speichern der Daten', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
