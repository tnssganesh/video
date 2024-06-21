// import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import VideoCard from '../VideoCard'
import FiltersGroup from '../FiltersGroup'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SavedVideo extends Component {
  state = {
    apiStatus: apiStatusConstants.success,
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsListView = () => (
    <LanguageContext.Consumer>
      {value => {
        const {savedList} = value
        const productsList = savedList
        const shouldShowProductsList = savedList.length > 0
        // console.log()
        return shouldShowProductsList ? (
          <div className="all-products-container">
            <div>
              <FaFire />
              <h1>Saved Videos</h1>
            </div>
            <ul className="products-list">
              {productsList.map(product => (
                <VideoCard video={product} key={product.id} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-products-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
              className="no-products-img"
              alt="no saved videos"
            />
            <h1 className="no-products-heading">No saved videos found</h1>
            <p className="no-products-description">
              You can save your videos while watching them
            </p>
          </div>
        )
      }}
    </LanguageContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <LightDarkContainer data-testid="savedVideos" outline={isDark}>
              <Header />
              <div className="homeList">
                <FiltersGroup />
                {this.renderAllProducts()}
              </div>
            </LightDarkContainer>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default SavedVideo
