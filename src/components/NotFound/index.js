import LanguageContext from '../../context/LanguageContext'
import './index.css'

const NotFound = () => (
  <LanguageContext.Consumer>
    {value => {
      const {isDark} = value
      return (
        <div className="not-found-container">
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
    }}
  </LanguageContext.Consumer>
)

export default NotFound
