import mockRestaurants from './mockData'

const fetchRestaurants = () =>
  new Promise(resolve =>
    setTimeout(() => resolve({data: mockRestaurants}), 400),
  )

export const fetchRestaurantById = id =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = mockRestaurants.find(r => r.id === String(id))
      if (found) resolve({data: found})
      else reject(new Error('Not found'))
    }, 300)
  })

export default fetchRestaurants
