import { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    bloodType: '',
    phoneNumber: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signup attempt:', formData)
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="relative flex min-h-screen w-full flex-col">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-10 p-6 md:px-10 lg:px-20">
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
            <span className="material-symbols-outlined text-primary text-2xl">
              health_and_safety
            </span>
            <h2 className="text-xl font-bold leading-tight tracking-tight">Dental Care</h2>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center">
          <div className="container mx-auto flex h-full max-w-6xl flex-col items-center justify-center p-4 lg:flex-row lg:p-0">
            {/* Left Column: Image & Tagline */}
            <div className="hidden w-full flex-col items-center justify-center p-8 text-center lg:flex lg:w-1/2">
              <img 
                className="mb-8 h-auto w-full max-w-md rounded-xl object-cover" 
                data-alt="A modern and clean dental clinic interior with a dental chair" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHQQLUt1kzIECAfCNwtX6uO9mq1D4FRJceFercQoe1xegDyKMeH55TiXb9E1oh0nkIVnR2AaRUQkvj4b3g3hg5Px1b9MTJVRfM-6q96yhl3FrpDdOhKAKkPi31yZtYOUVDNnZmBBS7cMFMnyyTtcwkwkCk77gGWqE6o1wSJdBWo68ku22zKSgFcuLwwWIB2Ylc_1wdNn8xVW8sL_U3AfVC02IASqL2P1Q2Ae0nUJjuvzRiFdVNFN8Qtc-9EO1O9VAhP_QcworQakE"
                alt="Dental Clinic"
              />
              <p className="text-2xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">
                Your smile journey starts here.
              </p>
              <p className="mt-2 text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
                Join our community for exceptional dental care.
              </p>
            </div>

            {/* Right Column: Form */}
            <div className="w-full max-w-md p-4 lg:w-1/2 lg:p-10">
              <div className="mb-6">
                <p className="text-3xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">
                  Create Your Patient Account
                </p>
                <p className="mt-2 text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
                  Let's get you set up for a brighter smile.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-gray-300">
                    Full Name
                  </p>
                  <input
                    className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-sm font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                    placeholder="Jane Doe"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <label className="flex flex-1 flex-col">
                    <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-gray-300">
                      Age
                    </p>
                    <input
                      className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-sm font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                      placeholder="28"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="flex flex-1 flex-col">
                    <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-gray-300">
                      Gender
                    </p>
                    <select
                      className="form-select flex h-12 w-full min-w-0 flex-1 resize-none appearance-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-sm font-normal leading-normal text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>

                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-gray-300">
                    Blood Type
                  </p>
                  <select
                    className="form-select flex h-12 w-full min-w-0 flex-1 resize-none appearance-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-sm font-normal leading-normal text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </label>

                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-gray-300">
                    Phone Number
                  </p>
                  <input
                    className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-sm font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-gray-300">
                    Email Address
                  </p>
                  <input
                    className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-sm font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                    placeholder="you@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-800 dark:text-gray-300">
                    Password
                  </p>
                  <input
                    className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-sm font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </label>

                <button 
                  type="submit"
                  className="flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal text-white transition-colors hover:bg-primary/90"
                >
                  <span className="truncate">Create Account</span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?
                  <Link className="font-bold text-primary hover:underline ml-1" to="/login">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 px-4 md:px-10 lg:px-20">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <a className="hover:underline" href="#">
              Privacy Policy
            </a>
            <span className="mx-2">·</span>
            <a className="hover:underline" href="#">
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Signup