import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/User/Sidebar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { privateAPI } from '../../utils/config'
import { toast } from 'react-toastify'
import { 
  FaBook, 
  FaUser, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaCheckCircle, 
  FaClock,
  FaSpinner,
  FaHistory,
  FaExclamationTriangle
} from 'react-icons/fa'

const BorrowedBook = () => {
  const [borrowBook, setBorrowBook] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(null)
  const user = JSON.parse(Cookies.get('user'))

  const fetchBorrowedBook = async () => {
    try {
      setIsLoading(true)
      const res = await privateAPI.get(`/process/getBorrowBookByUserID/${user._id}`)
      setBorrowBook(res.data.data)
    } catch (error) {
      console.error('Error fetching borrowed books:', error)
      toast.error('Failed to load your borrowed books', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReturn = async (id) => {
    if (window.confirm('Are you sure you want to return this book?')) {
      setIsProcessing(id)
      try {
        await privateAPI.put(`/process/returnBook/${id}`)
        toast.success('Book returned successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
        fetchBorrowedBook()
      } catch (error) {
        console.error('Error returning book:', error)
        toast.error('Failed to return book. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
      } finally {
        setIsProcessing(null)
      }
    }
  }

  const handleRenew = async (id) => {
    setIsProcessing(id)
    try {
      await privateAPI.put(`/process/renew/${id}`)
      toast.success('Book renewed successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
      fetchBorrowedBook()
    } catch (err) {
      console.error('Error renewing book:', err)
      toast.error(err.response?.data?.message || 'Failed to renew book. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
    } finally {
      setIsProcessing(null)
    }
  }

  useEffect(() => {
    fetchBorrowedBook()
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
  }

  const getDaysRemaining = (dueDate) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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

  const activeBooks = borrowBook.filter(book => book.isReturned === false)
  const returnedBooks = borrowBook.filter(book => book.isReturned === true)

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1'>
        {/* Header */}
        <div className='section-header'>
          <h2>My Books</h2>
          <p>Manage your borrowed books and track due dates</p>
        </div>

        {/* Statistics Cards */}
        <div className='status-content mb-8'>
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaBook />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{activeBooks.length}</p>
              <p className='stat-label'>Currently Borrowed</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaHistory />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{returnedBooks.length}</p>
              <p className='stat-label'>Returned Books</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaExclamationTriangle />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{activeBooks.filter(book => isOverdue(book.dueDate)).length}</p>
              <p className='stat-label'>Overdue Books</p>
            </div>
          </div>
        </div>

        {/* Currently Borrowed Books */}
        <div className='admin-section'>
          <div className='section-header'>
            <h2>Currently Borrowed</h2>
            <p>Books you have borrowed and need to return</p>
          </div>
          
          {activeBooks.length === 0 ? (
            <div className='text-center py-12'>
              <FaBook className='text-6xl text-text-light mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-text-primary mb-2'>No borrowed books</h3>
              <p className='text-text-secondary'>You haven't borrowed any books yet. Visit the dashboard to explore our collection!</p>
            </div>
          ) : (
            <div className='space-y-6'>
              {activeBooks.map(book => (
                <div key={book._id} className='bg-white rounded-20 p-6 shadow-lg border border-border-color'>
                  <div className='flex gap-6'>
                    <div className='flex-shrink-0'>
                      <img 
                        src={`http://localhost:3000/${book.book.bookImage}`} 
                        alt={book.book.title} 
                        className='w-48 h-64 object-cover rounded-16 shadow-md'
                      />
                    </div>
                    
                    <div className='flex-1 flex flex-col justify-between'>
                      <div className='space-y-4'>
                        <div>
                          <h3 className='text-2xl font-bold text-text-primary mb-2'>{book.book.title}</h3>
                          <p className='text-lg text-text-secondary italic'>by {book.book.author}</p>
                        </div>
                        
                        <p className='text-text-secondary leading-relaxed'>{book.book.description}</p>
                        
                        <div className='grid grid-cols-2 gap-6'>
                          <div className='flex items-center gap-3'>
                            <FaCalendarAlt className='text-primary-color' />
                            <div>
                              <p className='text-sm text-text-secondary'>Borrowed Date</p>
                              <p className='font-semibold text-text-primary'>{formatDate(book.borrowDate)}</p>
                            </div>
                          </div>
                          
                          <div className='flex items-center gap-3'>
                            <FaArrowRight className='text-accent-color' />
                            <div>
                              <p className='text-sm text-text-secondary'>Due Date</p>
                              <p className={`font-semibold ${
                                isOverdue(book.dueDate) ? 'text-error-color' : 'text-text-primary'
                              }`}>
                                {formatDate(book.dueDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {isOverdue(book.dueDate) && (
                          <div className='bg-red-50 border border-red-200 rounded-12 p-4'>
                            <div className='flex items-center gap-2'>
                              <FaExclamationTriangle className='text-error-color' />
                              <span className='text-error-color font-semibold'>
                                Overdue by {Math.abs(getDaysRemaining(book.dueDate))} days
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className='flex gap-4 pt-4'>
                        <button 
                          type='button' 
                          onClick={() => handleReturn(book._id)} 
                          className='btn-danger flex items-center gap-2'
                          disabled={isProcessing === book._id}
                        >
                          {isProcessing === book._id ? (
                            <FaSpinner className='animate-spin' />
                          ) : (
                            <FaCheckCircle />
                          )}
                          {isProcessing === book._id ? 'Returning...' : 'Return Book'}
                        </button>
                        
                        <button 
                          type='button' 
                          onClick={() => handleRenew(book._id)} 
                          className='btn-secondary flex items-center gap-2'
                          disabled={isProcessing === book._id}
                        >
                          {isProcessing === book._id ? (
                            <FaSpinner className='animate-spin' />
                          ) : (
                            <FaClock />
                          )}
                          {isProcessing === book._id ? 'Renewing...' : 'Renew Book'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Returned Books History */}
        {returnedBooks.length > 0 && (
          <div className='admin-section'>
            <div className='section-header'>
              <h2>Returned Books</h2>
              <p>History of books you have returned</p>
            </div>
            
            <div className='space-y-4'>
              {returnedBooks.slice(0, 5).map(book => (
                <div key={book._id} className='bg-bg-secondary rounded-12 p-4 border border-border-color'>
                  <div className='flex items-center gap-4'>
                    <img 
                      src={`http://localhost:3000/${book.book.bookImage}`} 
                      alt={book.book.title} 
                      className='w-16 h-20 object-cover rounded-8'
                    />
                    <div className='flex-1'>
                      <h4 className='font-semibold text-text-primary'>{book.book.title}</h4>
                      <p className='text-sm text-text-secondary'>by {book.book.author}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm text-text-secondary'>Returned on</p>
                      <p className='font-semibold text-text-primary'>{formatDate(book.returnDate)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BorrowedBook
