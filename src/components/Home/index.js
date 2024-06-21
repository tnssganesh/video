import Cookies from 'js-cookie'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {IoMdClose} from 'react-icons/io'
import Header from '../Header'
import VideoCard from '../VideoCard'
import FiltersGroup from '../FiltersGroup'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer, BannerContainer} from './styledComponents'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    isClose: false,

    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        {this.renderSearchInput()}

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

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getProducts()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => (
    <div className="search-input-container">
      <input
        value={this.searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={this.onChangeSearchInput}
        onKeyDown={this.onEnterSearchInput}
      />
      <button
        onClick={this.searchVideo}
        type="button"
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />.
      </button>
    </div>
  )

  searchVideo = () => {
    this.getProducts()
  }

  renderBanner = () => {
    const {isClose} = this.state
    return (
      !isClose && (
        <BannerContainer
          data-testid="banner"
          outlin="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
        >
          <img
            className="website-logo"
            src={
              false
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            }
            alt="nxt watch logo"
          />
          <p>Buy Nxt Watch Premium plans</p>
          <button type="button">GET IT NOW</button>
          <button
            data-testid="close"
            onClick={this.coloseClicked}
            type="button"
          >
            <IoMdClose />.
          </button>
        </BannerContainer>
      )
    )
  }

  coloseClicked = () => this.setState({isClose: true})

  render() {
    return (
      <LanguageContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <LightDarkContainer data-testid="home" outline={isDark}>
              <Header />
              <div className="homeList">
                <FiltersGroup />
                <div>
                  {this.renderBanner()}
                  {this.renderAllProducts(isDark)}
                </div>
              </div>
            </LightDarkContainer>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default Home
