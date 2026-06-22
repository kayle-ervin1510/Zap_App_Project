import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="brand" style={{ textDecoration: 'none' }}>
        ZAP APP
      </Link>

      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {currentUser && (
          <li>
            <Link to="/profile" className="nav-profile-link">
              {currentUser.preferred_name || currentUser.first_name}
            </Link>
          </li>
        )}
        <li>
          <button onClick={handleLogout} className="nav-logout-btn">
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  )
}
