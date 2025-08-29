import React from 'react'
import '../../sidebar.css'
import {NavLink, useNavigate} from 'react-router-dom'
import { 
  FaTachometerAlt, 
  FaBook, 
  FaExchangeAlt, 
  FaUsers, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaCommentDots,
  FaCog,
  FaChartBar
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
        <h2>Librarian Dashboard</h2>
      </div>
      
      <nav className='sidebar-nav'>
        <ul>
          {/* Main Navigation */}
          <li>
            <NavLink 
              to='/admin-dashboard' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaTachometerAlt/>
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          {/* Library Management */}
          <li>
            <NavLink 
              to='/book' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaBook/>
              <span>Manage Books</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to='/return-borrow' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaExchangeAlt/>
              <span>Return & Borrow</span>
            </NavLink>
          </li>
          
          {/* User Management */}
          <li>
            <NavLink 
              to='/userDetail' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaUsers/>
              <span>User Management</span>
            </NavLink>
          </li>
          
          {/* Analytics & Feedback */}
          <li>
            <NavLink 
              to='/feedback' 
              className={({isActive}) => isActive ? 'active' : ''}
            >
              <FaCommentDots/>
              <span>Feedback</span>
            </NavLink>
          </li>
          
          {/* Account Settings */}
          <li>
            <NavLink 
              to='/profile' 
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
