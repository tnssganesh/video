import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdMoon} from 'react-icons/io'
import Popup from 'reactjs-popup'
import {IoSunnyOutline} from 'react-icons/io5'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer, LogoutButton} from './styledComponents'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <LanguageContext.Consumer>
      {value => {
        const {isDark, changeTheme} = value
        const onChangeTheme = () => {
          changeTheme()
        }
        return (
          <LightDarkContainer theme={isDark ? '#424242' : '#f9f9f9'}>
            <nav className="nav-header">
              <div className="nav-content">
                <div className="nav-bar-mobile-logo-container">
                  <Link to="/">
                    <img
                      className="website-logo"
                      src={
                        isDark
                          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      }
                      alt="website logo"
                    />
                  </Link>
                </div>

                <div className="nav-bar-large-container">
                  <Link to="/">
                    <img
                      className="website-logo"
                      src={
                        isDark
                          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      }
                      alt="website logo"
                    />
                  </Link>
                  <ul className="nav-menu">
                    <li className="nav-menu-item">
                      <button
                        data-testid="theme"
                        onClick={onChangeTheme}
                        type="button"
                        className="nav-link"
                      >
                        {isDark ? <IoSunnyOutline /> : <IoMdMoon />}.
                      </button>
                    </li>

                    <li className="nav-menu-item">
                      <Link to="/products" className="nav-link">
                        <img
                          className="profileImga"
                          alt="profile"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                        />
                      </Link>
                    </li>
                  </ul>

                  <div className="popup-container">
                    <Popup
                      modal
                      trigger={
                        <button type="button" className="logout-desktop-btn">
                          Logout
                        </button>
                      }
                    >
                      {close => (
                        <>
                          <div className="popupContiner">
                            <p>Are you sure, you want to logout</p>
                            <button
                              type="button"
                              className="trigger-button"
                              onClick={() => close()}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="logout-desktop-btn"
                              onClick={onClickLogout}
                            >
                              Confirm
                            </button>
                          </div>
                        </>
                      )}
                    </Popup>
                  </div>
                </div>
              </div>
            </nav>
          </LightDarkContainer>
        )
      }}
    </LanguageContext.Consumer>
  )
}

export default withRouter(Header)
