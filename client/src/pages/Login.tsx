import { useContext, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { Coffee, Users, DoorOpen } from 'lucide-react'
import styles from './Login.module.css' // Import the CSS module

function Login() {
  const {
    user,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    login,
    getUser,
  } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user?.username && window.location.pathname === '/login') {
    return <Navigate to='/' replace />
  } else {
    return (
      <section className={`${styles.login} min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center p-4`}>
        <div className={`${styles.container} bg-white rounded-lg shadow-xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]`}>
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Coffee
                  className="w-12 h-12 text-purple-600 transform transition-all duration-500"
                />
                <div className="absolute -top-1 -right-1">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">The One With The Login</h1>
            <p className="text-gray-600 mt-2">Could this BE any more secure?</p>
          </div>

          {/* Form Section */}
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setLoginUsername(e.target.value)}
                value={loginUsername}
                className={`${styles.input} w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 placeholder-gray-400`}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
                value={loginPassword}
                className={`${styles.input} w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 placeholder-gray-400`}
              />
            </div>

            <button
              type="button"
              onClick={async () => {
                await login()
                navigate('/')
              }}
              className={`${styles.button} w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2`}
            >
              <DoorOpen className="w-5 h-5" />
              <span>How YOU doin'?</span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-gray-500 text-sm">OH. MY. GOD.</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register Button */}
          <Link
            to="/register"
            className={`${styles.registerButton} w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-center`}
          >
            I'll Be There For You - Register Now!
          </Link>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <a href="#" className="hover:text-purple-600 transition-colors duration-300">
              Forgot Password?
            </a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-purple-600 transition-colors duration-300">
              Need Help?
            </a>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
