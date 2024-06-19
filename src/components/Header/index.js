import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdMoon} from 'react-icons/io'
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
                  <button type="button" className="nav-mobile-btn">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                      alt="nav logout"
                      className="nav-bar-image"
                      onClick={onClickLogout}
                    />
                  </button>
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
                      <LogoutButton
                        color={isDark ? 'white' : '#0967d2'}
                        bgColor={!isDark ? 'white' : '#424242'}
                        bdColor={isDark ? '#424242' : 'white'}
                        onClick={onChangeTheme}
                        type="button"
                        className="nav-link"
                      >
                        {isDark ? <IoSunnyOutline /> : <IoMdMoon />}.
                      </LogoutButton>
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
                  <LogoutButton
                    color={isDark ? 'white' : '#0967d2'}
                    bgColor={!isDark ? 'white' : '#424242'}
                    bdColor={isDark ? 'white' : '#0967d2'}
                    type="button"
                    className="logout-desktop-btn"
                    onClick={onClickLogout}
                  >
                    Logout
                  </LogoutButton>
                </div>
              </div>
              <div className="nav-menu-mobile">
                <ul className="nav-menu-list-mobile">
                  <li className="nav-menu-item-mobile">
                    <Link to="/" className="nav-link">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                        alt="nav home"
                        className="nav-bar-image"
                      />
                    </Link>
                  </li>

                  <li className="nav-menu-item-mobile">
                    <Link to="/products" className="nav-link">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                        alt="nav products"
                        className="nav-bar-image"
                      />
                    </Link>
                  </li>
                  <li className="nav-menu-item-mobile">
                    <Link to="/cart" className="nav-link">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                        alt="nav cart"
                        className="nav-bar-image"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>{' '}
          </LightDarkContainer>
        )
      }}
    </LanguageContext.Consumer>
  )
}

export default withRouter(Header)
