import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Admin/Sidebar.jsx'
import '../../admin-dashboard.css'
import axios from 'axios'
import PieChart from '../../components/Admin/PieChart.jsx'
import { FaBook, FaUser, FaUsers, FaChartLine, FaBookOpen } from 'react-icons/fa'
import { privateAPI } from '../../utils/config.js'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [activeUser, setActiveUser] = useState([])
  const [books, setBooks] = useState([])
  const [totalBooks, setTotalBook] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await privateAPI.get('/user/get')
      setUsers(res.data.data)
      setActiveUser(res.data.data.filter(user => user.isDeleted === false))
    } catch (error) {
      console.log('Error fetching users', error)
    }
  }

  const TotalBook = async () => {
    try {
      const res = await privateAPI.get('/book/get')
      setTotalBook(res.data.data)
    } catch (error) {
      console.log('Error fetching books', error)
    }
  }
  
  const fetchBook = async () => {
    try {
      const res = await privateAPI.get('/book/get?limit=5')
      setBooks(res.data.data)
    } catch (error) {
      console.log('Error fetching books', error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await Promise.all([fetchUser(), fetchBook(), TotalBook()])
      setIsLoading(false)
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className='flex gap-8'>
        <Sidebar/>
        <div className='content flex-1 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1'>
        {/* Header */}
        <div className='mb-8'>
          <h1>Welcome Back, <span>Admin</span>!</h1>
          <p className='text-text-secondary text-lg'>Here's what's happening with your library today</p>
        </div>

        {/* Stats Cards */}
        <div className='status-content'>
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaUsers />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{users.length}</p>
              <p className='stat-label'>Total Users</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaUser />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{activeUser.length}</p>
              <p className='stat-label'>Active Users</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaBook />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{totalBooks.length}</p>
              <p className='stat-label'>Total Books</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaBookOpen />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{books.length}</p>
              <p className='stat-label'>Featured Books</p>
            </div>
          </div>
        </div>

        {/* Popular Books Section */}
        <div className='popular-books-section'>
          <div className='section-header'>
            <h2>Most Popular Books</h2>
            <p className='text-text-secondary'>Books that are trending in your library</p>
          </div>
          
          <div className='popular-books-grid'>
            {books.map(book => (
              <div key={book._id} className='popular-book'>
                <img 
                  src={`https://lms-g2f1.onrender.com/${book.bookImage}`} 
                  alt={book.title} 
                  className='book-cover'
                />
                <div className='overlay'></div>
                <div className='details-text'>
                  <p className='book-title'>{book.title}</p>
                  <p className='book-author'>{book.author}</p>
                  <p className='desc-book'>{book.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Chart Section */}
        <div className='stats-section'>
          <div className='section-header'>
            <h2>Library Statistics</h2>
            <p>Analytics showing the status of borrowed and returned books</p>
          </div>
          
          <div className='stats-chart-container'>
            <div className='chart-info'>
              <FaChartLine className='chart-icon' />
              <p className='chart-description'>
                The pie chart below shows the distribution of books that were returned and borrowed.
              </p>
            </div>
            <PieChart/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
