import {IoMdHome, IoLogoGameControllerB} from 'react-icons/io'
import {Link} from 'react-router-dom'
import {useCallback, useContext} from 'react'
import {RiPlayListAddLine} from 'react-icons/ri'
import {FaFire} from 'react-icons/fa'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer} from './styledComponents'
import './index.css'

const FiltersGroup = () => {
  const {isDark, currentOption, changeOption} = useContext(LanguageContext)

  const onClickHome = useCallback(() => {
    changeOption('Home')
  }, [changeOption])

  const onClickTrend = useCallback(() => {
    changeOption('Trending')
  }, [changeOption])

  const onClickGame = useCallback(() => {
    changeOption('Gaming')
  }, [changeOption])

  const onClickSaved = useCallback(() => {
    changeOption('Saved Video')
  }, [changeOption])

  const sidebarItems = [
    {id: 'Home', path: '/', icon: IoMdHome, onClick: onClickHome, name: 'Home'},
    {
      id: 'Trending',
      path: '/trending',
      icon: FaFire,
      onClick: onClickTrend,
      name: 'Trending',
    },
    {
      id: 'Gaming',
      path: '/gaming',
      icon: IoLogoGameControllerB,
      onClick: onClickGame,
      name: 'Gaming',
    },
    {
      id: 'Saved Videos',
      path: '/saved-videos',
      icon: RiPlayListAddLine,
      onClick: onClickSaved,
      name: 'Saved Videos',
    },
  ]

  // Base colors for theming
  const darkThemeColor = '#f9f9f9' // Light text/icon on dark background
  const lightThemeColor = '#424242' // Dark text/icon on light background
  const activeColor = '#ff0000' // Specified active icon color (red from pallete) or blue if it refers to link color (#0967d2). Using red for the icon as per typical design, but check the next block for safer implementation for links.
  const activeLinkColor = '#0967d2' // Active Link Color in design (often blue)

  return (
    <LightDarkContainer outline={isDark} className="filters-group-container">
      <ul>
        {sidebarItems.map(item => {
          const isActive = item.name === currentOption

          // --- Corrected logic to avoid nested ternaries ---
          // 1. Determine the icon color (Red if active, else theme color)
          let iconColor = isDark ? darkThemeColor : lightThemeColor
          if (isActive) {
            iconColor = activeLinkColor // Use activeLinkColor for consistency with active text/link color
          }

          // 2. Determine the text color for the <span> element

          const theme = isDark ? darkThemeColor : lightThemeColor

          const textColor = isActive ? activeLinkColor : theme

          // 3. Determine the Link tag color (base color should be text color, unless active then blue)
          const linkColor = isActive ? activeLinkColor : theme

          return (
            <li
              key={item.id}
              onClick={item.onClick}
              className={`rating-item ${isActive ? 'active-filter-item' : ''}`}
            >
              {/* The Link tag itself gets the main color */}
              <Link
                to={item.path}
                style={{
                  color: linkColor,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Icon color logic */}
                <item.icon style={{color: iconColor, marginRight: '8px'}} />
                {/* Text color logic */}
                <span
                  className={`category-name ${
                    isActive ? 'active-category-name' : ''
                  }`}
                  style={{color: textColor}}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div
        className="bootemCard"
        style={{color: isDark ? darkThemeColor : lightThemeColor}}
      >
        <p>CONTACT US</p>
        <div>
          <img
            className="imglogo"
            alt="facebook logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          />
          <img
            className="imglogo"
            alt="twitter logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          />
          <img
            className="imglogo"
            alt="linked in logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
          />
        </div>
        <p>Enjoy! Now to see your channels and recommendations!</p>
      </div>
    </LightDarkContainer>
  )
}

export default FiltersGroup
