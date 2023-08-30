<template>
  <!-- TODO Diese Komponente muss noch weiter in weitere Komponenten unterteilt werden-->
  <fieldset v-for="category in inventoryData" :key="category.id">
    <legend>{{ category.name }}</legend>
    <!-- TODO das hier sollte eine eigene Komponente sein-->
    <template v-for="categoryName in category" :key="categoryName">
      <div class="inventory-category" v-for="item in categoryName" :key="item.id">
        <input type="checkbox" v-model="item.name" />
        <label :for="item.name">{{ item.name }}</label>
      </div>
    </template>
  </fieldset>
  <label for="inventory"></label>
</template>

<script>
export default {
  data() {
    return {
      inventoryData: []
    }
  },

  methods: {
    async getInventory() {
      try {
        const response = await fetch('http://localhost:3000/inventory')
        const inventory = await response.json()
        this.inventoryData = inventory
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten', error)
      }
    }
  },

  beforeMount() {
    this.getInventory()
  }
}
</script>

<style lang="scss" scoped></style>
