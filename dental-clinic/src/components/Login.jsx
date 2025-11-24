import { useState } from 'react'

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('Patient')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRoleChange = (role) => {
    setSelectedRole(role)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', { selectedRole, email, password })
  }

  return (
    <div className="bg-background-light dark:bg-background-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col font-display group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="flex flex-col w-full">
              <main className="flex-1">
                <div className="flex min-h-screen">
                  {/* Left Side - Illustration */}
                  <div className="hidden lg:flex flex-1 items-center justify-center bg-primary/10 dark:bg-primary/20 p-8">
                    <div className="flex flex-col items-start justify-between h-full w-full max-w-md">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-4xl">
                          health_and_safety
                        </span>
                        <span className="text-2xl font-bold text-primary dark:text-white">Dental Care</span>
                      </div>
                      <div className="flex w-full grow items-center justify-center">
                        <div className="w-full aspect-square">
                          <div 
                            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none h-full" 
                            data-alt="Abstract illustration of a tooth with geometric shapes" 
                            style={{ 
                              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDouNigT-fkCJyTkiRrCztxW16BRUwVq_n-QCRsP1qYf9DlHF8bUBJng38SATlwKnAatv0veGIXQ0cHYouBPCTKOyhgvki1r2mHlLuYqQMepuh02LOzbPyGCPeSnFOhE3XpD-97XT-HaW8HABLEiinb1s77u9L3cbz35pZhvmfpftLfWgr9NkYQPtm-warkhUjdrEMCtjKpg0bb9jQF0Mr67FrlDv8Jq6ZsLZK0trp27LJpXNmFzx5GSIWgn7HmMYbjSjkHYySGIxg")' 
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-full"></div>
                    </div>
                  </div>

                  {/* Right Side - Login Form */}
                  <div className="flex flex-1 flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
                    <div className="w-full max-w-sm">
                      {/* Mobile Logo */}
                      <div className="flex items-center gap-3 lg:hidden mb-8 justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">
                          health_and_safety
                        </span>
                        <span className="text-xl font-bold text-primary dark:text-white">Dental Care</span>
                      </div>

                      <h1 className="text-[#2D3748] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-3">
                        Welcome Back
                      </h1>
                      <p className="text-[#2D3748] dark:text-gray-300 text-base font-normal leading-normal pb-3 pt-1">
                        I am a...
                      </p>

                      {/* Role Selector */}
                      <div className="flex">
                        <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 p-1.5">
                          <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 ${
                            selectedRole === 'Patient' 
                              ? 'bg-white dark:bg-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-primary dark:text-white' 
                              : 'text-[#2D3748] dark:text-gray-300'
                          } text-sm font-medium leading-normal transition-colors`}>
                            <span className="truncate">Patient</span>
                            <input 
                              className="invisible w-0" 
                              type="radio" 
                              value="Patient"
                              checked={selectedRole === 'Patient'}
                              onChange={() => handleRoleChange('Patient')}
                            />
                          </label>
                          <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 ${
                            selectedRole === 'Doctor' 
                              ? 'bg-white dark:bg-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-primary dark:text-white' 
                              : 'text-[#2D3748] dark:text-gray-300'
                          } text-sm font-medium leading-normal transition-colors`}>
                            <span className="truncate">Doctor</span>
                            <input 
                              className="invisible w-0" 
                              type="radio" 
                              value="Doctor"
                              checked={selectedRole === 'Doctor'}
                              onChange={() => handleRoleChange('Doctor')}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Login Form */}
                      <form onSubmit={handleSubmit} className="mt-6">
                        <div className="flex flex-col items-end gap-4">
                          <label className="flex flex-col min-w-40 flex-1 w-full">
                            <p className="text-[#2D3748] dark:text-gray-200 text-base font-medium leading-normal pb-2">
                              Email Address
                            </p>
                            <input 
                              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#2D3748] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 focus:border-primary dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal" 
                              placeholder="Enter your email address" 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </label>
                          <label className="flex flex-col min-w-40 flex-1 w-full">
                            <p className="text-[#2D3748] dark:text-gray-200 text-base font-medium leading-normal pb-2">
                              Password
                            </p>
                            <input 
                              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#2D3748] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 focus:border-primary dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal" 
                              placeholder="Enter your password" 
                              type="password" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </label>
                        </div>

                        <div className="mt-6">
                          <button 
                            type="submit"
                            className="flex items-center justify-center text-base font-medium px-6 py-3 h-12 rounded-lg w-full bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark transition-colors"
                          >
                            Log In
                          </button>
                        </div>
                      </form>

                      {/* Footer Links */}
                      <div className="mt-6 flex justify-between items-center text-sm">
                        <a className="font-medium text-primary hover:text-primary/80 dark:text-primary/80 dark:hover:text-primary" href="#">
                          Forgot Password?
                        </a>
                        <p className="text-[#2D3748] dark:text-gray-300">
                          Don't have an account?{' '}
                          <a className="font-medium text-primary hover:text-primary/80 dark:text-primary/80 dark:hover:text-primary" href="#">
                            Sign Up
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login