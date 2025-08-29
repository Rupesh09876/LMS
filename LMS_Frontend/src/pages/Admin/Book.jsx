import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/Admin/Sidebar.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { 
  FaSearch, 
  FaStar, 
  FaBook, 
  FaUser, 
  FaHashtag, 
  FaListOl, 
  FaFileAlt, 
  FaImage,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSpinner
} from 'react-icons/fa'
import { privateAPI } from '../../utils/config.js'

const Book = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const regex = new RegExp(search, 'i')
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    quantity: 0,
    description: ''
  })
  const [bookImage, setBookImage] = useState(null)
  const [editId, setEditId] = useState(null)

  const fetchBook = async () => {
    try {
      setIsLoading(true)
      const res = await privateAPI.get('/book/get')
      setBooks(res.data.data)
    } catch (err) {
      console.error('Error fetching Book', err)
      toast.error('Failed to fetch books', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const {name, value, type, files} = e.target
    if (type === 'file') {
      setBookImage(files[0])
    } else {
      setFormData(prev => ({...prev, [name]:value}))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value)
      })
      if(bookImage) {
        data.append('bookImage', bookImage)
      }

      if (editId) {
        await privateAPI.put(`/book/update/${editId}`, data)
        toast.success('Book updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
      } else {
        await privateAPI.post(`/book/add`, data)
        toast.success('Book added successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
      }
      setEditId(null)
      setFormData({
        title: '',
        author: '',
        isbn: '',
        quantity: 0,
        description: ''
      })
      fetchBook()
      setBookImage(null)
    } catch (error) {
      console.error('Error update || create', error)
      toast.error(error.response?.data?.message || 'Operation failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await privateAPI.delete(`/book/delete/${id}`)
        toast.success('Book deleted successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
        fetchBook()
      } catch (error) {
        console.error('Failed deleting book', error)
        toast.error('Failed to delete book. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
      }
    }
  }

  const handleEdit = (book) => {
    setEditId(book._id)
    setFormData({
      title: book.title || '',
      author: book.author || '',
      isbn: book.isbn || '',
      quantity: book.quantity || 0,
      description: book.description || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditId(null)
    setFormData({
      title: '',
      author: '',
      isbn: '',
      quantity: 0,
      description: ''
    })
    setBookImage(null)
  }

  useEffect(() => {
    fetchBook();
  },[])

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
        <div className='section-header'>
          <h2>Manage Books</h2>
          <p>Add, edit, and manage your library's book collection</p>
        </div>

        {/* Add/Edit Book Form */}
        <div className='admin-form'>
          <div className='form-header'>
            <h3>{editId ? 'Edit Book' : 'Add New Book'}</h3>
            <p>{editId ? 'Update the book information below' : 'Fill in the details to add a new book to your library'}</p>
          </div>
          
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='form-grid'>
              <div className='form-group'>
                <label>
                  <FaBook className='text-primary-color' />
                  Book Title
                </label>
                <input 
                  type="text"
                  name='title'
                  placeholder='Enter book title...'
                  value={formData.title} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className='form-group'>
                <label>
                  <FaUser className='text-primary-color' />
                  Author
                </label>
                <input 
                  type="text"
                  name='author'
                  placeholder='Enter author name...'
                  value={formData.author} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className='form-group'>
                <label>
                  <FaHashtag className='text-primary-color' />
                  ISBN
                </label>
                <input 
                  type="text"
                  name='isbn'
                  placeholder='Enter ISBN number...'
                  value={formData.isbn} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className='form-group'>
                <label>
                  <FaListOl className='text-primary-color' />
                  Quantity
                </label>
                <input 
                  type="number"
                  name='quantity'
                  placeholder='Enter quantity...'
                  value={formData.quantity} 
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              
              <div className='form-group full-width'>
                <label>
                  <FaFileAlt className='text-primary-color' />
                  Description
                </label>
                <textarea 
                  name='description'
                  placeholder='Enter book description...'
                  value={formData.description} 
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>
              
              <div className='form-group full-width'>
                <label>
                  <FaImage className='text-primary-color' />
                  Book Cover Image
                </label>
                <input 
                  type='file'
                  name='bookImage'
                  accept='image/*'
                  onChange={handleChange}
                  required={!editId}
                />
                <p className='text-sm text-text-secondary mt-2'>
                  Upload a high-quality image of the book cover (JPG, PNG, or WebP)
                </p>
              </div>
            </div>
            
            <div className='form-actions'>
              {editId ? (
                <>
                  <button type='submit' className='btn-primary' disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <FaSpinner className='animate-spin mr-2' />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaEdit className='mr-2' />
                        Update Book
                      </>
                    )}
                  </button>
                  <button type='button' onClick={handleCancelEdit} className='btn-warning'>
                    <FaTimes className='mr-2' />
                    Cancel Edit
                  </button>
                </>
              ) : (
                <button type='submit' className='btn-primary' disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <FaSpinner className='animate-spin mr-2' />
                      Adding...
                    </>
                  ) : (
                    <>
                      <FaPlus className='mr-2' />
                      Add Book
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Books Display Section */}
        <div className='admin-section'>
          <div className='section-header'>
            <h2>Library Collection</h2>
            <p>Browse and manage all books in your library</p>
          </div>
          
          <div className='search-section'>
            <div className='search-container'>
              <FaSearch className='search-icon' />
              <input 
                type="text" 
                value={search} 
                placeholder='Search books by title or author...' 
                onChange={(e) => setSearch(e.target.value)} 
                className='search-input'
              />
            </div>
          </div>
          
          <div className='books-grid'>
            {books
              .filter(book => regex.test(book.title) || regex.test(book.author))
              .map((book) => (
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
                    <div className='flex gap-2 mt-4'>
                      <button 
                        type='button' 
                        className='edit-btn' 
                        onClick={() => handleEdit(book)}
                      >
                        <FaEdit className='mr-1' />
                        Edit
                      </button>
                      <button 
                        type='button' 
                        className='dlt-btn' 
                        onClick={() => handleDelete(book._id)}
                      >
                        <FaTrash className='mr-1' />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          {books.filter(book => regex.test(book.title) || regex.test(book.author)).length === 0 && (
            <div className='no-books-found'>
              <FaBook className='no-books-icon' />
              <h3>No books found</h3>
              <p>Try adjusting your search terms or add new books to your library</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Book
