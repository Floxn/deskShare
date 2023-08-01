<template>
  <div></div>
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
