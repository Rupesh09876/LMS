import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/User/Sidebar'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { 
  FaPen, 
  FaUser, 
  FaEnvelope, 
  FaUserTag, 
  FaCamera, 
  FaSave, 
  FaSpinner,
  FaUserCircle,
  FaCalendarAlt,
  FaShieldAlt
} from 'react-icons/fa'
import { privateAPI } from '../../utils/config'

const UserProfile = () => {
  const [userDetail, setUserDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  })
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const handleChange = (e) => {
    const {name, value, type, files} = e.target
    if (type === 'file') {
      const file = files[0]
      setProfileImage(file)
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewImage(reader.result)
        }
        reader.readAsDataURL(file)
      }
    } else {
      setFormData((prev) => ({...prev, [name]: value}))
    }
  }

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      // Try to get user from cookies first
      const userCookie = Cookies.get('user')
      if (userCookie) {
        const user = JSON.parse(userCookie)
        setUserDetail(user)
        setFormData({
          name: user.name || '',
          email: user.email || '',
          role: user.role || '',
          profileImage: user.profileImage || ''
        })
        setIsLoading(false)
        return
      }

      // If no user in cookies, try API call
      const res = await privateAPI.get('/user/getUser')
      if (res.data && res.data.data) {
        setUserDetail(res.data.data)
        setFormData({
          name: res.data.data.name || '',
          email: res.data.data.email || '',
          role: res.data.data.role || '',
          profileImage: res.data.data.profileImage || ''
        })
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      
      // If API fails, try to get user from cookies as fallback
      const userCookie = Cookies.get('user')
      if (userCookie) {
        try {
          const user = JSON.parse(userCookie)
          setUserDetail(user)
          setFormData({
            name: user.name || '',
            email: user.email || '',
            role: user.role || '',
            profileImage: user.profileImage || ''
          })
        } catch (parseError) {
          console.error('Error parsing user cookie:', parseError)
          toast.error('Failed to load profile information. Please log in again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false
          })
        }
      } else {
        toast.error('Failed to load profile information. Please log in again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val)
      })

      if (profileImage) {
        data.append('profileImage', profileImage)
      }

      const res = await privateAPI.put(`/user/update/${userDetail._id}`, data)
      
      // Update the user cookie with new data
      if (res.data && res.data.data) {
        const updatedUser = res.data.data
        Cookies.set('user', JSON.stringify(updatedUser))
        setUserDetail(updatedUser)
      }
      
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
      
      // Refresh user data
      fetchUser()
      setProfileImage(null)
      setPreviewImage(null)
    } catch (err) {
      console.error('Error updating profile:', err)
      toast.error(err.response?.data?.message || 'Failed to update profile. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false
      })
    } finally {
      setIsUpdating(false)
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

  // If no user data is available, show error message
  if (!userDetail) {
    return (
      <div className='flex gap-8'>
        <Sidebar/>
        <div className='content flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <FaUserCircle className='text-6xl text-text-light mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-text-primary mb-2'>Profile Not Available</h3>
            <p className='text-text-secondary mb-4'>Unable to load your profile information.</p>
            <button 
              onClick={fetchUser} 
              className='btn-primary'
            >
              Try Again
            </button>
          </div>
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
          <h2>Profile Settings</h2>
          <p>Manage your account information and preferences</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Profile Form */}
          <div className='lg:col-span-2'>
            <div className='profile-section'>
              <div className='profile-header'>
                <div className='profile-avatar'>
                  <img 
                    src={previewImage || (formData.profileImage ? `https://lms-g2f1.onrender.com/${formData.profileImage}` : '/default-avatar.png')} 
                    alt="Profile Picture" 
                    className='profile-image'
                    onError={(e) => {
                      e.target.src = '/default-avatar.png'
                    }}
                  />
                  <label htmlFor="profile-image" className='profile-edit-btn'>
                    <FaCamera />
                  </label>
                  <input 
                    type="file" 
                    name="profileImage" 
                    onChange={handleChange} 
                    id='profile-image' 
                    accept='image/*'
                    hidden 
                  />
                </div>
                <h3 className='text-2xl font-bold text-text-primary'>{formData.name}</h3>
                <p className='text-text-secondary'>{formData.role} • {formData.email}</p>
              </div>
              
              <form onSubmit={handleUpdate} encType='multipart/form-data'>
                <div className='form-grid'>
                  <div className='form-group'>
                    <label>
                      <FaUser className='text-primary-color' />
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      name='name' 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder='Enter your full name'
                      required
                    />
                  </div>
                  
                  <div className='form-group'>
                    <label>
                      <FaEnvelope className='text-primary-color' />
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      name='email' 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder='Enter your email address'
                      required
                    />
                  </div>
                  
                  <div className='form-group'>
                    <label>
                      <FaUserTag className='text-primary-color' />
                      Role
                    </label>
                    <input 
                      type="text" 
                      name='role' 
                      value={formData.role} 
                      onChange={handleChange}
                      placeholder='Your role'
                      readOnly
                      className='bg-gray-50 cursor-not-allowed'
                    />
                    <p className='text-xs text-text-secondary mt-1'>
                      Role cannot be changed. Contact system administrator for role modifications.
                    </p>
                  </div>
                </div>
                
                <div className='form-actions'>
                  <button 
                    type='submit' 
                    className='btn-primary'
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <FaSpinner className='animate-spin mr-2' />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave className='mr-2' />
                        Update Profile
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Account Information */}
          <div className='space-y-6'>
            <div className='admin-section'>
              <div className='section-header'>
                <h2>Account Details</h2>
                <p>Your account information</p>
              </div>
              
              <div className='space-y-4'>
                <div className='flex items-center gap-3 p-3 bg-bg-secondary rounded-12'>
                  <FaUserCircle className='text-2xl text-primary-color' />
                  <div>
                    <p className='text-sm text-text-secondary'>User ID</p>
                    <p className='font-mono text-sm text-text-primary'>{userDetail?._id || 'N/A'}</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-3 p-3 bg-bg-secondary rounded-12'>
                  <FaUserTag className='text-2xl text-accent-color' />
                  <div>
                    <p className='text-sm text-text-secondary'>Account Type</p>
                    <p className='text-text-primary capitalize'>{formData.role || 'N/A'}</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-3 p-3 bg-bg-secondary rounded-12'>
                  <FaCalendarAlt className='text-2xl text-secondary-color' />
                  <div>
                    <p className='text-sm text-text-secondary'>Member Since</p>
                    <p className='text-text-primary'>
                      {userDetail?.createdAt ? new Date(userDetail.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='admin-section'>
              <div className='section-header'>
                <h2>Account Permissions</h2>
                <p>Your current permissions</p>
              </div>
              
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-success-color rounded-full'></div>
                  <span className='text-sm text-text-primary'>Browse Books</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-success-color rounded-full'></div>
                  <span className='text-sm text-text-primary'>Borrow Books</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-success-color rounded-full'></div>
                  <span className='text-sm text-text-primary'>Return Books</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-success-color rounded-full'></div>
                  <span className='text-sm text-text-primary'>View History</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-success-color rounded-full'></div>
                  <span className='text-sm text-text-primary'>Submit Feedback</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
                  <span className='text-sm text-text-secondary'>Manage Library</span>
                </div>
              </div>
            </div>

            <div className='admin-section'>
              <div className='flex items-center gap-3 mb-4'>
                <FaShieldAlt className='text-2xl text-success-color' />
                <h3 className='text-lg font-semibold text-text-primary'>Account Security</h3>
              </div>
              <p className='text-sm text-text-secondary mb-4'>
                Your account is protected with industry-standard security measures.
              </p>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-success-color rounded-full'></div>
                  <span className='text-sm text-text-primary'>Secure Authentication</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-success-color rounded-full'></div>
                  <span className='text-sm text-text-primary'>Data Encryption</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-success-color rounded-full'></div>
                  <span className='text-sm text-text-primary'>Privacy Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
