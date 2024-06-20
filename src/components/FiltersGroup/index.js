import {IoMdHome, IoLogoGameControllerB} from 'react-icons/io'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import {RiPlayListAddLine} from 'react-icons/ri'
import {FaFire} from 'react-icons/fa'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer} from './styledComponents'
import './index.css'

const homeOptions = [
  {id: 'all?search=', text: 'Home'},
  {id: 'trending', text: 'Trending'},
  {id: 'gaming', text: 'Gaming'},
  {id: 'saved-videos', text: 'Saved Videos'},
]

class FiltersGroup extends Component {
  render() {
    return (
      <LanguageContext.Consumer>
        {value => {
          const {isDark, changeOption} = value

          // console.log(isDark)

          const onClickHome = () => {
            changeOption('Home')
          }
          const onClickTrend = () => {
            changeOption('Trending')
          }
          const onClickGame = () => {
            changeOption('Gaming')
          }
          const onClickSaved = () => {
            changeOption('Saved Video')
          }
          return (
            <LightDarkContainer
              outline={isDark}
              className="filters-group-container"
            >
              <ul>
                <li onClick={onClickHome} className="rating-item">
                  <Link to="/">
                    <IoMdHome /> Home
                  </Link>
                </li>

                <li onClick={onClickTrend} className="rating-item">
                  <Link to="/tending">
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
                <h1>CONTACT US</h1>
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
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default FiltersGroup
