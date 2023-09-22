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
    return await response.json()
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten', error)
  }
}

export async function addItem(path, item) {
  try {
    await fetch(`http://localhost:3000${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  } catch (error) {
    console.error('Fehler beim Schreiben der Daten', error)
  }
}

export async function updateItem(path, item) {
  try {
    await fetch(`http://localhost:3000${path}/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  } catch (error) {
    console.error('Fehler beim Updaten der Daten', error)
  }
}

export async function deleteItem(path, item) {
  try {
    await fetch(`http://localhost:3000${path}/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Fehler beim Löschen der Daten', error)
  }
}

// mehr Funktionen -> getOneItem
