//
export async function baseFetch(path, options = {}) {
  try {
    const response = await fetch('http://0.0.0.0:8055/items' + path, options)
    return await response.json()
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten', error)
  }
}

export async function getAll(path) {
  try {
    return await baseFetch(path)
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten', error)
  }
}

export async function addItem(path, item) {
  try {
    return await baseFetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer lSZTADqyORxK7eqexQ2mrYky9U_qFwY9'
      },
      body: JSON.stringify(item)
    })
  } catch (error) {
    console.error('Fehler beim Schreiben der Daten', error)
  }
}

export async function updateItem(path, item) {
  const itemPath = `${path}/${item.id}`
  try {
    return await baseFetch(itemPath, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer lSZTADqyORxK7eqexQ2mrYky9U_qFwY9'
      },
      body: JSON.stringify(item)
    })
  } catch (error) {
    console.error('Fehler beim Updaten der Daten', error)
  }
}

export async function deleteItem(path, item) {
  const itemPath = `${path}/${item.id}`
  try {
    return await baseFetch(itemPath, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer lSZTADqyORxK7eqexQ2mrYky9U_qFwY9'
      }
    })
  } catch (error) {
    console.error('Fehler beim Löschen der Daten', error)
  }
}

// mehr Funktionen -> getOneItem
