import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import fetchRestaurants from '../../api/apiService'
import './index.css'

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchRestaurants()
      .then(res => {
        if (mounted) setRestaurants(res.data)
      })
      .catch(e => {
        if (mounted) setErr(e.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="restaurant-list-container">
      <header className="restaurant-header">
        <h1 className="restaurant-title">Nearby Restaurants</h1>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('isAuthenticated')
            window.location.href = '/login'
          }}
          className="restaurant-logout-btn"
        >
          Logout
        </button>
      </header>

      {loading && (
        <div className="loader-container">
          <TailSpin
            type="ThreeDots"
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading"
          />
        </div>
      )}
      {err && <p className="error">{err}</p>}

      <div className="restaurant-grid">
        {restaurants.map(r => (
          <Link key={r.id} to={`/detail/${r.id}`} className="restaurant-card">
            <div className="restaurant-image">
              <img src={r.imageURL} className="restaurant-img" alt={r.name} />
            </div>
            <h2 className="restaurant-name">{r.name}</h2>
            <p className="restaurant-address">{r.address}</p>
            <div className="restaurant-meta">
              <span className="detail-rating">
                <FaStar className="icon-star" />
                <span className="restaurant-rating">{r.rating}</span>
              </span>
              <span className="restaurant-cuisine">{r.cuisine}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RestaurantList
