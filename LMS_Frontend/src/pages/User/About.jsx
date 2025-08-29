import React from 'react'
import Sidebar from '../../components/User/Sidebar'
import { 
  FaBook, 
  FaUsers, 
  FaSearch, 
  FaClock, 
  FaStar, 
  FaHeart,
  FaShieldAlt,
  FaGlobe
} from 'react-icons/fa'

const About = () => {
  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1'>
        {/* Header */}
        <div className='section-header'>
          <h2>About LibraFlow</h2>
          <p>Discover our mission to make knowledge accessible to everyone</p>
        </div>

        {/* Hero Section */}
        <div className='admin-section'>
          <div className='text-center mb-12'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-color to-primary-dark rounded-full mb-6'>
              <FaBook className='text-3xl text-white' />
            </div>
            <h1 className='text-4xl font-bold text-text-primary mb-4'>
              Welcome to <span className='text-primary-color'>LibraFlow</span>
            </h1>
            <p className='text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed'>
              Your modern library management system designed to make your reading journey seamless and enjoyable. 
              Discover, borrow, and explore our vast collection of books with ease.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className='admin-section'>
          <div className='section-header'>
            <h2>Why Choose LibraFlow?</h2>
            <p>Experience the future of library management</p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white rounded-20 p-6 shadow-lg border border-border-color text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-primary-color to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaSearch className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-bold text-text-primary mb-3'>Easy Discovery</h3>
              <p className='text-text-secondary'>
                Search and discover books quickly with our advanced search functionality. 
                Find exactly what you're looking for in seconds.
              </p>
            </div>
            
            <div className='bg-white rounded-20 p-6 shadow-lg border border-border-color text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-secondary-color to-secondary-dark rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaClock className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-bold text-text-primary mb-3'>Smart Management</h3>
              <p className='text-text-secondary'>
                Track your borrowed books, due dates, and reading history. 
                Never miss a return date with our intelligent reminders.
              </p>
            </div>
            
            <div className='bg-white rounded-20 p-6 shadow-lg border border-border-color text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-accent-color to-accent-dark rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaUsers className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-bold text-text-primary mb-3'>Community Focus</h3>
              <p className='text-text-secondary'>
                Join a community of readers. Share feedback, discover new books, 
                and connect with fellow book lovers.
              </p>
            </div>
            
            <div className='bg-white rounded-20 p-6 shadow-lg border border-border-color text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-success-color to-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaShieldAlt className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-bold text-text-primary mb-3'>Secure & Reliable</h3>
              <p className='text-text-secondary'>
                Your data is protected with industry-standard security measures. 
                Enjoy peace of mind while using our platform.
              </p>
            </div>
            
            <div className='bg-white rounded-20 p-6 shadow-lg border border-border-color text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-warning-color to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaStar className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-bold text-text-primary mb-3'>Quality Collection</h3>
              <p className='text-text-secondary'>
                Curated collection of high-quality books across all genres. 
                From classics to contemporary, we have something for everyone.
              </p>
            </div>
            
            <div className='bg-white rounded-20 p-6 shadow-lg border border-border-color text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaGlobe className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-bold text-text-primary mb-3'>Always Accessible</h3>
              <p className='text-text-secondary'>
                Access your library anytime, anywhere. Our responsive design 
                works perfectly on all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className='admin-section'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold text-text-primary mb-6'>Our Mission</h2>
              <p className='text-lg text-text-secondary leading-relaxed mb-6'>
                At LibraFlow, we believe that knowledge should be accessible to everyone. 
                Our mission is to create a seamless, user-friendly library management system 
                that connects readers with the books they love.
              </p>
              <p className='text-lg text-text-secondary leading-relaxed mb-6'>
                We strive to maintain a well-organized borrowing system that ensures 
                fair access to books while providing an exceptional user experience. 
                Whether you're a student, professional, or casual reader, LibraFlow 
                is designed to enhance your reading journey.
              </p>
              <div className='flex items-center gap-4'>
                <FaHeart className='text-2xl text-error-color' />
                <span className='text-lg font-semibold text-text-primary'>
                  Empowering readers, one book at a time
                </span>
              </div>
            </div>
            
            <div className='bg-gradient-to-br from-primary-color to-primary-dark rounded-20 p-8 text-white'>
              <h3 className='text-2xl font-bold mb-6'>What We Offer</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-white rounded-full'></div>
                  <span>Extensive book collection across all genres</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-white rounded-full'></div>
                  <span>Easy-to-use borrowing and return system</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-white rounded-full'></div>
                  <span>Personalized reading recommendations</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-white rounded-full'></div>
                  <span>Real-time availability tracking</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-white rounded-full'></div>
                  <span>24/7 online access to your account</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-white rounded-full'></div>
                  <span>Community features and book discussions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className='admin-section text-center'>
          <h2 className='text-3xl font-bold text-text-primary mb-4'>Ready to Get Started?</h2>
          <p className='text-lg text-text-secondary mb-8'>
            Join thousands of readers who have already discovered the joy of LibraFlow
          </p>
          <div className='flex justify-center gap-4'>
            <button className='btn-primary'>
              Explore Books
            </button>
            <button className='btn-secondary'>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
