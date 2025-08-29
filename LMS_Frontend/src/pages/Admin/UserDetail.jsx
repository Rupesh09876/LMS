import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { 
  FaSearch, 
  FaUser, 
  FaEnvelope, 
  FaUserTag, 
  FaToggleOn, 
  FaToggleOff, 
  FaTrash,
  FaSpinner,
  FaUsers,
  FaUserCheck,
  FaUserTimes
} from 'react-icons/fa'
import { privateAPI } from '../../utils/config'

const UserDetail = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(null)
  const regex = new RegExp(search, 'i')

  const fetchUser = async() => {
    try {
      setIsLoading(true)
      const res = await privateAPI.get('/user/get')
      setUsers(res.data.data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to fetch users', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      setIsProcessing(id)
      try {
        await privateAPI.delete(`/user/delete/${id}`)
        toast.success('User deleted successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
        fetchUser()
      } catch (err) {
        toast.error('Cannot delete user. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
      } finally {
        setIsProcessing(null)
      }
    }
  }

  const handleToggleDelete = async (id) => {
    setIsProcessing(id)
    try {
      await privateAPI.delete(`/user/put/${id}`)
      toast.success('User status updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
      fetchUser()
    } catch (err) {
      toast.error('Cannot change user status. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
    } finally {
      setIsProcessing(null)
    }
  }

  useEffect(() => {
    fetchUser()
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

  const filteredUsers = users.filter(user => 
    regex.test(user.name) || 
    regex.test(user.email) ||
    regex.test(user.role)
  )

  const activeUsers = users.filter(user => !user.isDeleted)
  const inactiveUsers = users.filter(user => user.isDeleted)
  const librarians = users.filter(user => user.role === 'librarian')

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1'>
        {/* Header */}
        <div className='section-header'>
          <h2>User Management</h2>
          <p>Manage and monitor all library users and their accounts</p>
        </div>

        {/* Statistics Cards */}
        <div className='status-content mb-8'>
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
              <FaUserCheck />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{activeUsers.length}</p>
              <p className='stat-label'>Active Users</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaUserTimes />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{inactiveUsers.length}</p>
              <p className='stat-label'>Inactive Users</p>
            </div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-icon'>
              <FaUserTag />
            </div>
            <div className='stat-info'>
              <p className='stat-number'>{librarians.length}</p>
              <p className='stat-label'>Librarians</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className='search-section'>
          <div className='search-container'>
            <FaSearch className='search-icon' />
            <input 
              type="text" 
              value={search} 
              placeholder='Search users by name, email, or role...' 
              onChange={(e) => setSearch(e.target.value)} 
              className='search-input'
            />
          </div>
        </div>

        {/* Users Table */}
        <div className='admin-table-container'>
          <div className='section-header'>
            <h2>User Directory</h2>
            <p>Complete list of all registered users in the library system</p>
          </div>
          
          <div className='overflow-x-auto'>
            <table className='admin-table'>
              <thead>
                <tr>
                  <th>
                    <FaUser className='inline mr-2' />
                    Profile Image
                  </th>
                  <th>
                    <FaUser className='inline mr-2' />
                    Name
                  </th>
                  <th>
                    <FaEnvelope className='inline mr-2' />
                    Email
                  </th>
                  <th>
                    <FaUserTag className='inline mr-2' />
                    Role
                  </th>
                  <th>
                    <FaToggleOn className='inline mr-2' />
                    Status
                  </th>
                  <th>
                    <FaUser className='inline mr-2' />
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img 
                        src={`http://localhost:3000/${user.profileImage}`} 
                        alt={user.name} 
                        className='table-avatar'
                      />
                    </td>
                    <td>
                      <div>
                        <p className='font-semibold text-text-primary'>{user.name}</p>
                        <p className='text-sm text-text-secondary'>ID: {user._id.slice(-8)}</p>
                      </div>
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        <FaEnvelope className='text-primary-color' />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        <FaUserTag className='text-accent-color' />
                        <span className={`table-status ${
                          user.role === 'librarian' ? 'status-active' : 'status-borrowed'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className='flex items-center gap-2'>
                        {user.isDeleted ? (
                          <>
                            <FaUserTimes className='text-error-color' />
                            <span className='table-status status-inactive'>Inactive</span>
                          </>
                        ) : (
                          <>
                            <FaUserCheck className='text-success-color' />
                            <span className='table-status status-active'>Active</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className='flex gap-2'>
                        {user.role !== 'librarian' ? (
                          <>
                            <button 
                              onClick={() => handleToggleDelete(user._id)} 
                              className={`btn-secondary text-sm px-3 py-1 ${
                                isProcessing === user._id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                              disabled={isProcessing === user._id}
                            >
                              {isProcessing === user._id ? (
                                <FaSpinner className='animate-spin' />
                              ) : user.isDeleted ? (
                                <>
                                  <FaToggleOn className='mr-1' />
                                  Activate
                                </>
                              ) : (
                                <>
                                  <FaToggleOff className='mr-1' />
                                  Deactivate
                                </>
                              )}
                            </button>
                            <button 
                              onClick={() => handleDelete(user._id)} 
                              className='btn-danger text-sm px-3 py-1'
                              disabled={isProcessing === user._id}
                            >
                              <FaTrash className='mr-1' />
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className='text-text-secondary italic text-sm'>Restricted</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className='text-center py-12'>
              <FaUsers className='text-6xl text-text-light mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-text-primary mb-2'>No users found</h3>
              <p className='text-text-secondary'>
                {search ? 'Try adjusting your search terms' : 'No users have been registered yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDetail
