

import Faces from '../fixtures/faces'

function fetchApi (prevItems, renderItems) {
  return new Promise((resolve, reject) => {
    if(renderItems > Faces.length) {
      reject('No more Items to load')
    } else {
      console.log(`prevItems: ${prevItems} renderItems: ${renderItems}`)
      let faces = Faces.slice(prevItems, renderItems)
      setTimeout(() => {
        resolve(faces)
      }, 2000)
    }
  })
}

function preemptiveFetchItems (prevItems, renderItems) {
  console.log('pre-fetch items by 20')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(renderItems > Faces.length) {
        reject('No more to Load')
      } else {
        fetchApi(prevItems, renderItems)
          .then((res) => resolve(res))
          .catch((onErr) => reject(onErr))
      }

    }, 500)
  })
}


export {
  fetchApi,
  preemptiveFetchItems
}
