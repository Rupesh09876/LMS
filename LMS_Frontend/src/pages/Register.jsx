import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaUserTag, FaCamera, FaUserPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { privateAPI } from '../utils/config'

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        role: 'borrower'
    })
    const [profileImage, setProfileImage] = useState(null)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value, type, files} = e.target
        if (type === 'file') {
            setProfileImage(files[0])
        } else {
            setFormData((prev) => ({...prev, [name]: value}))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value)
            })
            if(profileImage) {
                data.append('profileImage', profileImage)
            }
            
            await privateAPI.post('/user/register', data)
            toast.success('Registration successful! Please sign in to continue.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false
            })
            setFormData({
                email: '',
                name: '',
                password: '',
                role: 'borrower',
                profileImage: ""
            })
            setProfileImage(null)
            navigate('/login')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false
            })
        } finally {
            setIsLoading(false)
        }
    }
    
  return (
    <div className='register-contaitner'>
        <div className='register-form'>
            <div className='text-center mb-8'>
                <h2>Create Account</h2>
                <p>Join our library community today</p>
            </div>
            
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='space-y-6'>
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
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
                        className='w-full'
                    />
                </div>
                
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
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
                        className='w-full'
                    />
                </div>
                
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <FaLock className='text-primary-color' />
                        Password
                    </label>
                    <div className='relative'>
                        <input 
                            type={show ? "text" : "password"} 
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Create a strong password'
                            required
                            className='w-full pr-12'
                        />
                        <button 
                            type='button' 
                            onClick={() => setShow(!show)} 
                            className='show-hide-btn absolute top-1/2 right-3 transform -translate-y-1/2'
                        >
                            {!show ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <FaUserTag className='text-primary-color' />
                        Account Type
                    </label>
                    <input 
                        type="text" 
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                        placeholder='Account type'
                        readOnly
                        className='w-full bg-gray-50 cursor-not-allowed'
                    />
                    <p className='text-xs text-gray-500'>You are registering as a borrower. Librarian accounts require special permissions.</p>
                </div>
                
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <FaCamera className='text-primary-color' />
                        Profile Picture
                    </label>
                    <input 
                        type="file" 
                        name='profileImage'
                        accept='image/*'
                        onChange={handleChange}
                        required
                        className='w-full'
                    />
                    <p className='text-xs text-gray-500'>Upload a clear photo of yourself (JPG, PNG, or WebP)</p>
                </div>
                
                <button 
                    type='submit' 
                    className='register-button w-full flex items-center justify-center gap-2'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                    ) : (
                        <FaUserPlus />
                    )}
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <div className='text-center mt-6'>
                <Link to="/login" className='text-primary-color hover:text-primary-dark font-medium transition-colors'>
                    Already have an account? Sign in here
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Register
