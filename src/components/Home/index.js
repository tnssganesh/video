import Cookies from 'js-cookie'

import {useState, useEffect, useCallback, useContext} from 'react'
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

const Home = () => {
  const {isDark} = useContext(LanguageContext)

  const [productsList, setProductsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [isClose, setIsClose] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const getProducts = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')

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
      setProductsList(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [searchInput]) // Re-run fetch when searchInput changes

  useEffect(() => {
    getProducts()
  }, [getProducts]) // Initial fetch and re-fetch when getProducts (and thus searchInput) changes

  const retry = () => {
    getProducts()
  }

  const renderFailureView = () => (
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

      <button onClick={retry} type="button">
        Retry
      </button>
    </div>
  )

  const renderProductsListView = () => {
    const shouldShowProductsList = productsList.length > 0
    return shouldShowProductsList ? (
      <div className="all-products-container">
        {renderSearchInput()}

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
        <button onClick={retry} type="button">
          Retry
        </button>
      </div>
    )
  }

  const renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderAllProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      searchVideo()
    }
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const searchVideo = () => {
    getProducts()
  }

  const renderSearchInput = () => (
    <div className="search-input-container">
      <input
        value={searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
      />
      <button
        onClick={searchVideo}
        type="button"
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />.
      </button>
    </div>
  )

  const coloseClicked = () => setIsClose(true)

  const renderBanner = () => (
    !isClose && (
      <BannerContainer
        data-testid="banner"
        outlin="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
      >
        <img
          className="website-logo"
          src={
            isDark
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt="nxt watch logo"
        />
        <p>Buy Nxt Watch Premium plans</p>
        <button type="button">GET IT NOW</button>
        <button
          data-testid="close"
          onClick={coloseClicked}
          type="button"
        >
          <IoMdClose />.
        </button>
      </BannerContainer>
    )
  )

  return (
    <LightDarkContainer data-testid="home" outline={isDark}>
      <Header />
      <div className="homeList">
        <FiltersGroup />
        <div>
          {renderBanner()}
          {renderAllProducts()}
        </div>
      </div>
    </LightDarkContainer>
  )
}

export default Home
