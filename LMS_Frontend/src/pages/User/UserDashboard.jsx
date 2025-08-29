import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/User/Sidebar'
import {privateAPI} from '../../utils/config.js'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { FaSearch, FaStar, FaBookOpen, FaArrowRight, FaSpinner } from 'react-icons/fa'

const UserDashboard = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [borrowedBook, setBorrowedBook] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isBorrowing, setIsBorrowing] = useState(null)
  const user = JSON.parse(Cookies.get('user'))
  const regex = new RegExp(search, 'i');

  const borrowed = borrowedBook.filter(book => book.isReturned === false).length
  const returned = borrowedBook.filter(book => book.isReturned === true).length

  const fetchBook = async () => {
    try {
      const res = await privateAPI.get('/book/get')
      setBooks(res.data.data)
    } catch (error) {
      console.log('Error fetching books', error)
    }
  }

  const fetchBorrowedBook = async () => {
    try {
      const res = await privateAPI.get(`/process/getBorrowedBook/${user._id}`)
      setBorrowedBook(res.data.data)
    } catch (error) {
      console.log('Error fetching borrowed books', error)
    }
  }

  const handleBorrowBook = async (id) => {
    setIsBorrowing(id)
    try {
      await privateAPI.post(`/process/borrowBook/${id}`)
      toast.success('Book borrowed successfully! Enjoy your reading!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
      fetchBook() 
      fetchBorrowedBook()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to borrow book. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
    } finally {
      setIsBorrowing(null)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await Promise.all([fetchBook(), fetchBorrowedBook()])
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
          <h1>Welcome, <span>{user.name}</span>!</h1>
          <p className='text-text-secondary text-lg'>Discover and borrow amazing books from our collection</p>
        </div>

        {/* Stats Cards */}
        <div className='status-content'>
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaBookOpen />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{borrowed}</p>
              <p className='stat-label'>Currently Borrowed</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaArrowRight />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{returned}</p>
              <p className='stat-label'>Books Returned</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className='search-section mb-8'>
          <div className='relative max-w-2xl mx-auto'>
            <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary' />
            <input 
              type="text" 
              value={search} 
              placeholder='Search for books by title or author...' 
              onChange={(e) => setSearch(e.target.value)} 
              className='search-bar'
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className='books-section'>
          <div className='section-header mb-6'>
            <h2>Available Books</h2>
            <p className='text-text-secondary'>
              {books.filter(book => regex.test(book.title) || regex.test(book.author)).length} books found
            </p>
          </div>
          
          <div className='books-grid'>
            {books
              .filter(book => regex.test(book.title) || regex.test(book.author))
              .map(book => (
                <div key={book._id} className='book-container'>
                  <img 
                    src={`https://lms-g2f1.onrender.com/${book.bookImage}`} 
                    alt={book.title} 
                    className='book-image'
                  />
                  <div className="book-overlay"></div>
                  <div className='book-text-container'>
                    <p className='book-title'>{book.title}</p>
                    <p className='book-author'>{book.author}</p>
                    <div className='book-stats'>
                      <span className='availability-badge'>
                        Available: {book.available}/{book.quantity}
                      </span>
                      <span className='rating-badge'>
                        <FaStar className='rating-icon' />
                        {book.rating}
                      </span>
                    </div>
                    <button 
                      type='button' 
                      className='borrow-button'
                      onClick={() => handleBorrowBook(book._id)}
                      disabled={isBorrowing === book._id || book.available === 0}
                    >
                      {isBorrowing === book._id ? (
                        <FaSpinner className='animate-spin' />
                      ) : (
                        <FaBookOpen />
                      )}
                      {isBorrowing === book._id ? 'Borrowing...' : book.available === 0 ? 'Out of Stock' : 'Borrow Book'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
          
          {books.filter(book => regex.test(book.title) || regex.test(book.author)).length === 0 && (
            <div className='no-books-found'>
              <FaBookOpen className='no-books-icon' />
              <h3>No books found</h3>
              <p>Try adjusting your search terms or browse all available books</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
