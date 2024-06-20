import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {IoLogoGameControllerB} from 'react-icons/io'
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

class Gaming extends Component {
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

    const apiUrl = `https://apis.ccbp.in/videos/gaming`
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

  retry = () => {
    this.getProducts()
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="failure view"
        className="products-failure-img"
      />
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderProductsListView = () => {
    const {productsList} = this.state
    const shouldShowProductsList = productsList.length > 0
    // console.log(productsList)
    return shouldShowProductsList ? (
      <div className="all-products-container">
        <div>
          <IoLogoGameControllerB />
          <h1>Gaming</h1>
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
            <LightDarkContainer outline={isDark}>
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

export default Gaming
