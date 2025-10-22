import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import VideoCard from '../VideoCard'
import FiltersGroup from '../FiltersGroup'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer} from './styledComponents'
import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(i => ({
        id: i.id,
        title: i.title,
        thumbnailUrl: i.thumbnail_url,
        channel: i.channel,
        name: i.name,
        viewCount: i.view_count,
        publishedAt: i.published_at,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      // console.log(fetchedData)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = isDark => (
    <div className="products-error-view-container">
      <img
        src={
          isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>

      <button onClick={this.retry} type="button">
        Retry
      </button>
    </div>
  )

  retry = () => {
    this.getProducts()
  }

  renderProductsListView = () => {
    const {productsList} = this.state
    const shouldShowProductsList = productsList.length > 0
    // console.log(productsList)
    return shouldShowProductsList ? (
      <div className="all-products-container">
        <div>
          <FaFire />
          <h1>Trending</h1>
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
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
          className="no-products-img"
          alt="no videos"
        />
        <h1 className="no-products-heading">No Search results found</h1>
        <p className="no-products-description">
          Try different key words or remove search filter
        </p>
        <button onClick={this.onRetry} type="button">
          Retry
        </button>
      </div>
    )
  }

  onRetry = () => {
    this.getProducts()
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView(isDark)
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
            <LightDarkContainer data-testid="trending" outline={isDark}>
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

export default Trending
