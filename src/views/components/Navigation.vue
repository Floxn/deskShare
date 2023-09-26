<template>
  <nav class="navigation">
    <ul class="navigation-list">
      <li class="navigation-item">
        <router-link class="navigation-link" to="/admin">Admin</router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" to="/admin/room/create">Admin Room Create</router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" to="/admin/desk/create">Admin Desk Create</router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" to="/admin/rooms">Admin Rooms</router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" to="/admin/desks">Admin Desks</router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" to="/admin/inventory">Admin Inventory</router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" to="/room/2">Room 2</router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" to="/user/2">User 1</router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" to="/register">Register User</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/variables';
.navigation {
  &-list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    gap: $spacer * 1.5;
    position: fixed;
    height: 100svh;
    background: $background-color-lighter;
    padding: $spacer;
  }
}

.router {
  &-link {
    &-active {
      border-bottom: 2px solid $primary-color;
    }
  }
}
</style>
