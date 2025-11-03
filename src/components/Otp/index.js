import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const Otp = () => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const CORRECT = '123456'

  const onSubmit = e => {
    e.preventDefault()
    if (otp === CORRECT) {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/list')
    } else {
      setError('Invalid OTP. Hint: 123456')
    }
  }

  return (
    <div className="otp-container">
      <form onSubmit={onSubmit} className="otp-form">
        <h1 className="otp-title">Verify OTP</h1>
        <input
          inputMode="numeric"
          value={otp}
          placeholder="Enter 6-digit OTP"
          className="otp-input"
          onChange={e => {
            setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
            setError('')
          }}
        />
        {error && <div className="otp-error">{error}</div>}
        <button type="submit" className="otp-btn">
          Verify
        </button>
      </form>
    </div>
  )
}
export default Otp
