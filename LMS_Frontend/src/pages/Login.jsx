import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash, FaSignInAlt, FaEnvelope, FaLock} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { privateAPI } from '../utils/config'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await privateAPI.post('/auth/login', formData)
            Cookies.set('token', res.data.data.token)
            Cookies.set('user', JSON.stringify(res.data.data.userExist))
            
            toast.success('Login successful! Welcome back!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false
            })

            const user = JSON.parse(Cookies.get('user'))
            if (user.role === 'librarian') {
                navigate('/admin-dashboard')
            } else if (user.role === 'borrower') {
                navigate('/user-dashboard')
            }
            setFormData({
                email: '',
                password: ''
            })
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false
            })
        } finally {
            setIsLoading(false)
        }
    }
    
  return (
    <div className='signin-container'>
        <div className='signin-form'>
            <div className='text-center mb-8'>
                <h2>Welcome Back</h2>
                <p>Sign in to your account to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
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
                            placeholder='Enter your password'
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
                
                <button 
                    type='submit' 
                    className='signin-button w-full flex items-center justify-center gap-2'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                    ) : (
                        <FaSignInAlt />
                    )}
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className='text-center mt-6'>
                <Link to="/" className='text-primary-color hover:text-primary-dark font-medium transition-colors'>
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login
