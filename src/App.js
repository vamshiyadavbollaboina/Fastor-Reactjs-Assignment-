import {Component} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Otp from './components/Otp'
import RestaurantList from './components/RestaurantList'
import RestaurantDetail from './components/RestaurantDetail'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <RestaurantList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <ProtectedRoute>
                <RestaurantDetail />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
