import {Component} from 'react'
import {Link, useParams} from 'react-router-dom'
import {FaMapMarkerAlt, FaStar, FaUtensils, FaArrowLeft} from 'react-icons/fa'
import {TailSpin} from 'react-loader-spinner'
import fetchRestaurants from '../../api/apiService'
import './index.css'

function RestaurantDetailWrapper() {
  const {id} = useParams()
  return <RestaurantDetail id={id} />
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetail extends Component {
  state = {
    restaurant: null,
    apiStatus: apiStatusConstants.initial,
    isDragging: false,
    dragStart: {x: 0, y: 0},
    logoPosition: {x: 400, y: 50},
  }

  componentDidMount() {
    this.getRestaurantDetail()
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  getRestaurantDetail = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {id} = this.props

    try {
      const response = await fetchRestaurants()
      const restaurant = response.data.find(each => each.id === id)

      if (restaurant) {
        this.setState({
          restaurant,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleMouseDown = e => {
    e.preventDefault()
    this.setState({
      isDragging: true,
      dragStart: {x: e.clientX, y: e.clientY},
    })
  }

  handleMouseMove = e => {
    const {isDragging, dragStart, logoPosition} = this.state
    if (!isDragging) return

    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    this.setState({
      logoPosition: {x: logoPosition.x + dx, y: logoPosition.y + dy},
      dragStart: {x: e.clientX, y: e.clientY},
    })
  }

  handleMouseUp = () => {
    const {isDragging} = this.state
    if (isDragging) {
      this.setState({isDragging: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view">
      <p>No restaurant found or failed to fetch data.</p>
      <Link to="/list" className="back-link">
        <FaArrowLeft className="back-icon" /> Back
      </Link>
    </div>
  )

  renderRestaurantDetail = () => {
    const {restaurant, logoPosition} = this.state

    return (
      <div className="detail-container">
        <header className="detail-header">
          <h1 className="detail-title">{restaurant.name}</h1>
          <Link to="/list" className="back-link">
            <FaArrowLeft className="back-icon" /> Back
          </Link>
        </header>

        <div className="detail-card" style={{position: 'relative'}}>
          <div
            className="fastor-logo"
            onMouseDown={this.handleMouseDown}
            role="presentation"
            style={{
              left: `${logoPosition.x}px`,
              top: `${logoPosition.y}px`,
            }}
          >
            <img
              src="https://res.cloudinary.com/dq1rqwebs/image/upload/c_thumb,w_200,g_face/v1762196447/download_fnsjuh.jpg"
              alt="Fastor Logo"
              width="100"
              height="50"
              draggable={false}
            />
          </div>

          <img
            src={restaurant.imageURL}
            alt={restaurant.name}
            className="detail-image"
          />

          <div className="detail-info">
            <p className="detail-address">
              <FaMapMarkerAlt className="icon" /> {restaurant.address}
            </p>

            <div className="detail-meta">
              <span className="detail-rating">
                <FaStar className="icon-star" /> {restaurant.rating}
              </span>
              <span className="detail-cuisine">
                <FaUtensils className="icon" /> {restaurant.cuisine}
              </span>
            </div>
          </div>

          <p className="detail-description">
            Welcome to <strong>{restaurant.name}</strong>, a top-rated spot for{' '}
            <strong>{restaurant.cuisine}</strong> cuisine located at{' '}
            {restaurant.address}. Enjoy delicious dishes and a relaxing
            atmosphere with great service.
          </p>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetail()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default RestaurantDetailWrapper
