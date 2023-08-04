<template>
  <nav class="navigation">
    <ul class="navigation-list">
      <li class="navigation-item">
        <a class="navigation-link" href="/admin">Admin</a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="/admin/room/create">Admin Room Create</a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="/admin/rooms">Admin Rooms</a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="/admin/desk/create">Admin Desk Create</a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="/admin/desks">Admin Desks</a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="/admin/inventory">Admin Inventory</a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="/room?id=2">Room 2</a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="/user?id=2">User 1</a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="/register">Register User</a>
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
    flex-direction: row;
    flex-wrap: nowrap;
    gap: $spacer * 1.5;
  }
}
</style>
