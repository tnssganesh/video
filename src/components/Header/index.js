import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdMoon} from 'react-icons/io'
import Popup from 'reactjs-popup'
import {IoSunnyOutline} from 'react-icons/io5'
import {useContext, useCallback} from 'react'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer} from './styledComponents'

import './index.css'

const Header = props => {
  const {history} = props
  const {isDark, changeTheme} = useContext(LanguageContext)

  // Use useCallback for memoized function
  const onClickLogout = useCallback(() => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }, [history])

  // DEFINE onChangeTheme using useCallback so it's available for the button click
  const onChangeTheme = useCallback(() => {
    changeTheme()
  }, [changeTheme])

  // --- Helper variables for clearer JSX and styling ---

  const websiteLogo = isDark
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  const themeIconColor = isDark ? '#f9f9f9' : '#424242'

  const themeIcon = isDark ? (
    <IoSunnyOutline size={25} style={{color: themeIconColor}} />
  ) : (
    <IoMdMoon size={25} style={{color: themeIconColor}} />
  )

  const headerBgColor = isDark ? '#212121' : '#f9f9f9'

  // Helper function to define themed styles for the Logout button
  const getLogoutButtonStyles = isDarku => ({
    color: isDarku ? '#f9f9f9' : '#4f46e5',
    backgroundColor: isDark ? 'transparent' : 'white',
    borderColor: isDark ? '#f9f9f9' : '#4f46e5',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '8px 16px',
    fontWeight: '600',
    fontSize: '13px',
    borderRadius: '4px',
    marginLeft: '14px',
    cursor: 'pointer',
    outline: 'none',
  })

  const logoutStyles = getLogoutButtonStyles(isDark)

  // The code is now a functional component and doesn't need LanguageContext.Consumer
  // as it uses the useContext(LanguageContext) hook above.
  return (
    <LightDarkContainer theme={headerBgColor}>
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/">
              <img
                className="website-logo"
                src={websiteLogo}
                alt="website logo"
              />
            </Link>
          </div>

          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                className="website-logo"
                src={websiteLogo}
                alt="website logo"
              />
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                {/* Now onChangeTheme is correctly called here */}
                <button
                  data-testid="theme"
                  onClick={onChangeTheme}
                  type="button"
                  className="nav-link"
                  style={{
                    color: themeIconColor,
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                  }}
                >
                  {themeIcon}.
                </button>
              </li>

              <li className="nav-menu-item">
                <img
                  className="profileImga"
                  alt="profile"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                />
              </li>
            </ul>

            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button
                    type="button"
                    className="logout-desktop-btn"
                    style={logoutStyles}
                  >
                    Logout
                  </button>
                }
                className="popup-content"
              >
                {close => (
                  <>
                    <div
                      className="popupContiner"
                      style={{
                        backgroundColor: isDark ? '#231f20' : '#ffffff',
                        color: isDark ? '#f9f9f9' : '#00306e',
                      }}
                    >
                      <p>Are you sure, you want to logout</p>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                        style={{
                          color: isDark ? '#cccccc' : '#64748b',
                          border: `1px solid ${isDark ? '#cccccc' : '#64748b'}`,
                          backgroundColor: isDark
                            ? 'transparent'
                            : 'transparent',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          margin: '0 10px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="logout-desktop-btn"
                        onClick={onClickLogout}
                        style={{
                          color: '#ffffff',
                          backgroundColor: '#3b82f6',
                          borderColor: '#3b82f6',
                          borderStyle: 'solid',
                          borderWidth: '1px',
                          padding: '8px 16px',
                          fontWeight: '600',
                          fontSize: '13px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
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
}

export default withRouter(Header)
