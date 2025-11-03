import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const Login = () => {
  const [mobile, setMobile] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('savedMobile')
    if (saved) {
      setMobile(saved.slice(-10))
      setRemember(true)
    }
  }, [])

  const onSubmit = e => {
    e.preventDefault()
    const clean = mobile.replace(/\D/g, '')
    if (clean.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }
    if (remember) localStorage.setItem('savedMobile', clean)
    else localStorage.removeItem('savedMobile')
    localStorage.setItem('loginMobile', clean)
    navigate('/otp')
  }

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <h1 className="login-title">Login</h1>

        <label htmlFor="mobilenumber" className="login-label">
          Mobile Number
          <input
            id="mobilenumber"
            className="login-input"
            placeholder="Enter 10-digit mobile"
            type="tel"
            value={mobile}
            onChange={e => {
              setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
              setError('')
            }}
          />
        </label>

        <div className="login-actions">
          <label htmlFor="remember" className="login-checkbox">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          <button type="submit" className="login-btn">
            Send OTP
          </button>
        </div>

        {error && <div className="login-error">{error}</div>}

        <p className="login-note">
          Use OTP <strong>123456</strong> on next screen.
        </p>
      </form>
    </div>
  )
}

export default Login
