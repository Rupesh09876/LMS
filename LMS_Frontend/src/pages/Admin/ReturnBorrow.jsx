import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import axios from 'axios'
import { 
  FaSearch, 
  FaUser, 
  FaBook, 
  FaCalendarAlt, 
  FaExchangeAlt, 
  FaCheckCircle, 
  FaClock,
  FaSpinner
} from 'react-icons/fa'
import { privateAPI } from '../../utils/config'

const ReturnBorrow = () => {
  const [borrowedBook, setBorrowedBook] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const regex = new RegExp(search, 'i')

  const fetchBorrowedBook = async () => {
    try {
      setIsLoading(true)
      const res = await privateAPI.get('/process/getBorrowedDetailed')
      setBorrowedBook(res.data.data)
    } catch (error) {
      console.error('Error fetching borrowed books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBorrowedBook()
  },[])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (isReturned) => {
    return isReturned ? <FaCheckCircle className='text-success-color' /> : <FaClock className='text-warning-color' />
  }

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

  const filteredBooks = borrowedBook.filter(book => 
    regex.test(book.user.name) || 
    regex.test(book.book.title) ||
    regex.test(book.isReturned ? 'returned' : 'borrowed')
  )

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1'>
        {/* Header */}
        <div className='section-header'>
          <h2>Return & Borrow Management</h2>
          <p>Track and manage all book borrowing activities in your library</p>
        </div>

        {/* Search Section */}
        <div className='search-section'>
          <div className='search-container'>
            <FaSearch className='search-icon' />
            <input 
              type="text" 
              value={search} 
              placeholder='Search by user name, book title, or status...' 
              onChange={(e) => setSearch(e.target.value)} 
              className='search-input'
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='status-content mb-8'>
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaBook />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{borrowedBook.length}</p>
              <p className='stat-label'>Total Transactions</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaClock />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{borrowedBook.filter(book => !book.isReturned).length}</p>
              <p className='stat-label'>Currently Borrowed</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaCheckCircle />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{borrowedBook.filter(book => book.isReturned).length}</p>
              <p className='stat-label'>Returned Books</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaUser />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{new Set(borrowedBook.map(book => book.user._id)).size}</p>
              <p className='stat-label'>Active Users</p>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className='admin-table-container'>
          <div className='section-header'>
            <h2>Borrowing Transactions</h2>
            <p>Complete overview of all book borrowing and returning activities</p>
          </div>
          
          <div className='overflow-x-auto'>
            <table className='admin-table'>
              <thead>
                <tr>
                  <th>
                    <FaUser className='inline mr-2' />
                    User Profile
                  </th>
                  <th>
                    <FaUser className='inline mr-2' />
                    User Name
                  </th>
                  <th>
                    <FaBook className='inline mr-2' />
                    Book Title
                  </th>
                  <th>
                    <FaCalendarAlt className='inline mr-2' />
                    Borrowed Date
                  </th>
                  <th>
                    <FaExchangeAlt className='inline mr-2' />
                    Status
                  </th>
                  <th>
                    <FaCalendarAlt className='inline mr-2' />
                    Returned Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((borrow) => (
                  <tr key={borrow._id}>
                    <td>
                      <img 
                        src={`https://lms-g2f1.onrender.com/${borrow.user.profileImage}`} 
                        className='table-avatar' 
                        alt={borrow.user.name} 
                      />
                    </td>
                    <td>
                      <div>
                        <p className='font-semibold text-text-primary'>{borrow.user.name}</p>
                        <p className='text-sm text-text-secondary'>{borrow.user.email}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className='font-semibold text-text-primary'>{borrow.book.title}</p>
                        <p className='text-sm text-text-secondary'>by {borrow.book.author}</p>
                      </div>
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        <FaCalendarAlt className='text-primary-color' />
                        <span>{formatDate(borrow.borrowDate)}</span>
                      </div>
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        {getStatusIcon(borrow.isReturned)}
                        <span className={`table-status ${borrow.isReturned ? 'status-returned' : 'status-borrowed'}`}>
                          {borrow.isReturned ? 'Returned' : 'Borrowed'}
                        </span>
                      </div>
                    </td>
                    <td>
                      {borrow.returnDate ? (
                        <div className='flex items-center gap-2'>
                          <FaCalendarAlt className='text-success-color' />
                          <span>{formatDate(borrow.returnDate)}</span>
                        </div>
                      ) : (
                        <span className='text-text-secondary italic'>Not returned yet</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredBooks.length === 0 && (
            <div className='text-center py-12'>
              <FaBook className='text-6xl text-text-light mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-text-primary mb-2'>No transactions found</h3>
              <p className='text-text-secondary'>
                {search ? 'Try adjusting your search terms' : 'No borrowing transactions have been recorded yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReturnBorrow
