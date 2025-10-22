import {useContext} from 'react'
import LanguageContext from '../../context/LanguageContext'
import './index.css'

const NotFound = () => {
  const {isDark} = useContext(LanguageContext)

  return (
    <div
      className="not-found-container"
      data-testid="notFound"
      style={{
        backgroundColor: isDark ? '#0f0f0f' : '#f9f9f9',
        color: isDark ? '#f9f9f9' : '#424242',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={
          isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        }
        alt="not found"
        className="not-found-img"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found.</p>
    </div>
  )
}

export default NotFound
