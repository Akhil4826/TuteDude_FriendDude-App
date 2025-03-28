import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const navigate = useNavigate()
  const { user, getUser, logout } = useContext(UserContext)

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header
      className={styles.header}
      style={{
        width: window.location.pathname === '/login' ? '0%' : '100%',
      }}
    >
      {user?.username ? (
        <>
          {/* BACK BUTTON */}
          {window.location.pathname !== '/' && (
            <button
              className={styles.backButton}
              onClick={() => {
                navigate(-1)
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}

          {/* LOGO */}
          <Link className={styles.logo} to='/'>
            FriendDude
          </Link>

          {/* LOGOUT BUTTON */}
          <button
            className={styles.logoutButton}
            onClick={() => {
              logout()
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <div>Join the FriendDude App</div>
      )}
    </header>
  )
}

export default Header
