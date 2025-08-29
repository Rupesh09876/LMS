import React from 'react'
import '../../sidebar.css'
import {NavLink, useNavigate} from 'react-router-dom'
import { 
  FaTachometerAlt, 
  FaBookOpen, 
  FaInfoCircle, 
  FaEnvelope, 
  FaUserCircle, 
  FaSignOutAlt,
  FaHeart,
  FaHistory,
  FaBook
} from 'react-icons/fa'
import axios from 'axios'
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'

const Sidebar = () => {
  const navigate = useNavigate()
  
  const handleLogout = async() => {
    try {
      const res = await axios.post('https://lms-g2f1.onrender.com/api/auth/logout', {}, {withCredentials: true})
      Cookies.remove('token')
      Cookies.remove('user')
      toast.success('Successfully logged out. See you soon!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }
  
  return (
    <div className='sidebar-box'>
      <div className='sidebar-header'>
        <div className='logo-container'>
          <div className='logo-placeholder'>
            <img 
              src='/logo.png' 
              alt='LibraFlow Logo' 
              className='logo-image'
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className='logo-fallback'>
              <FaBook className='logo-icon' />
            </div>
          </div>
        </div>
        <h1>Libra<span>Flow</span></h1>
        <h2>User Dashboard</h2>
      </div>
      
      <nav className='sidebar-nav'>
        <ul>
          {/* Main Navigation */}
          <li>
            <NavLink 
              to='/user-dashboard' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaTachometerAlt/>
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          {/* Book Management */}
          <li>
            <NavLink 
              to='/borrow-book' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaBookOpen/>
              <span>My Books</span>
            </NavLink>
          </li>
          
          {/* Information */}
          <li>
            <NavLink 
              to='/about' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaInfoCircle/>
              <span>About</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to='/contact' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaEnvelope/>
              <span>Contact</span>
            </NavLink>
          </li>
          
          {/* Account Settings */}
          <li>
            <NavLink 
              to='/user-profile' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaUserCircle/>
              <span>Profile</span>
            </NavLink>
          </li>
          
          {/* Logout */}
          <li className='logout-item'>
            <button 
              onClick={handleLogout}
              className='logout-button'
            >
              <FaSignOutAlt/>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
