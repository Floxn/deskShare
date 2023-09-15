//
export async function baseFetch(path, options = {}) {
  try {
    const response = await fetch('http://localhost:3000' + path, options)
    return await response.json()
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten', error)
  }
}

export async function getAll(path) {
  try {
    const response = await fetch('http://localhost:3000' + path)
    const data = await response.json()
    console.log('in getAll Function', data)
    return data
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten', error)
  }
}

// mehr Funktionen -> getAll, getOneItem, updateItem, deleteItem
