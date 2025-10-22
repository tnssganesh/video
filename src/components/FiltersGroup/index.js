import {IoMdHome, IoLogoGameControllerB} from 'react-icons/io'
import {Link} from 'react-router-dom'
import {useCallback, useContext} from 'react'
import {RiPlayListAddLine} from 'react-icons/ri'
import {FaFire} from 'react-icons/fa'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer} from './styledComponents'
import './index.css'

const FiltersGroup = () => {
  const {isDark, changeOption} = useContext(LanguageContext)

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

  return (
    <LightDarkContainer
      outline={isDark}
      className="filters-group-container"
    >
      <ul>
        <li onClick={onClickHome} className="rating-item">
          <Link to="/">
            <IoMdHome />
            Home
          </Link>
        </li>

        <li onClick={onClickTrend} className="rating-item">
          <Link to="/trending">
            <FaFire />
            Trending
          </Link>
        </li>
        <li onClick={onClickGame} className="rating-item">
          <Link to="/gaming">
            <IoLogoGameControllerB /> Gaming
          </Link>
        </li>
        <li onClick={onClickSaved} className="rating-item">
          <Link to="/saved-videos">
            <RiPlayListAddLine />
            Saved Videos
          </Link>
        </li>
      </ul>
      <div className="bootemCard">
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
