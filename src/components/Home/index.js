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
  }, [searchInput])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const retry = () => {
    getProducts()
  }

  // Theme dependent colors
  const mainTextColor = isDark ? '#f9f9f9' : '#424242'
  const searchInputBg = isDark ? '#383838' : '#f1f5f9'
  const searchInputColor = isDark ? '#f9f9f9' : '#0f172a'
  const searchIconColor = isDark ? '#f9f9f9' : '#475569'
  const searchButtonBg = isDark ? '#313131' : '#f1f5f9'
  const searchButtonBorderColor = isDark ? '#313131' : '#e2e8f0'

  const renderFailureView = () => (
    <div
      className="products-error-view-container"
      style={{color: mainTextColor, textAlign: 'center'}}
    >
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

      <button
        onClick={retry}
        type="button"
        style={{
          backgroundColor: '#4f46e5',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          cursor: 'pointer',
        }}
      >
        Retry
      </button>
    </div>
  )

  const searchVideo = () => {
    getProducts()
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      searchVideo()
    }
  }

  const renderSearchInput = () => (
    <div
      className="search-input-container"
      style={{
        borderColor: searchButtonBorderColor,
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: searchInputBg,
        display: 'flex',
        alignItems: 'center',
        maxWidth: '400px',
        margin: '20px 0',
        borderRadius: '4px',
      }}
    >
      <input
        value={searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
        style={{
          backgroundColor: searchInputBg,
          color: searchInputColor,
          flexGrow: 1,
          border: 'none',
          padding: '8px 16px',
          outline: 'none',
        }}
      />
      <button
        onClick={searchVideo}
        type="button"
        data-testid="searchButton"
        style={{
          backgroundColor: searchButtonBg,
          border: 'none',
          borderLeft: `1px solid ${searchButtonBorderColor}`,
          padding: '8px 16px',
          cursor: 'pointer',
          height: '100%', // Match height of input wrapper
        }}
      >
        . <BsSearch className="search-icon" style={{color: searchIconColor}} />
      </button>
    </div>
  )

  const renderProductsListView = () => {
    const shouldShowProductsList = productsList.length > 0
    return (
      <div className="all-products-container" style={{color: mainTextColor}}>
        {renderSearchInput()}

        {shouldShowProductsList ? (
          <ul
            className="products-list"
            style={{listStyleType: 'none', padding: 0}}
          >
            {productsList.map(product => (
              <VideoCard video={product} key={product.id} />
            ))}
          </ul>
        ) : (
          <div className="no-products-view" style={{textAlign: 'center'}}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              className="no-products-img"
              alt="no videos"
            />
            <h1 className="no-products-heading">No Search results found</h1>
            <p className="no-products-description">
              Try different key words or remove search filter
            </p>
            <button
              onClick={retry}
              type="button"
              style={{
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              Retry
            </button>
          </div>
        )}
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

  const coloseClicked = () => setIsClose(true)

  const renderBanner = () => {
    const nxtWatchLogo = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

    return (
      !isClose && (
        <BannerContainer
          data-testid="banner"
          outlin="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
          style={{
            height: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            width: '100%',
            backgroundImage: `url("https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png")`, // Banner background image
            backgroundSize: 'cover',
            color: isDark ? '#ffffff' : '#1e293b', // Text color on banner
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <img
              className="website-logo"
              src={nxtWatchLogo}
              alt="nxt watch logo"
              style={{width: '130px'}}
            />
            <button
              data-testid="close"
              onClick={coloseClicked}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isDark ? '#181818' : '#1e293b', // Close icon should contrast with banner
              }}
            >
              <IoMdClose size={20} />.
            </button>
          </div>

          <p style={{marginTop: '20px', maxWidth: '350px'}}>
            Buy Nxt Watch Premium plans
          </p>
          <button
            type="button"
            style={{
              alignSelf: 'flex-start',
              padding: '8px 24px',
              backgroundColor: 'transparent',
              color: isDark ? '#ffffff' : '#1e293b',
              borderColor: isDark ? '#ffffff' : '#1e293b',
              borderStyle: 'solid',
              borderWidth: '1px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            GET IT NOW
          </button>
        </BannerContainer>
      )
    )
  }

  return (
    <LightDarkContainer data-testid="home" outline={isDark}>
      <Header />
      <div
        className="homeList"
        style={{display: 'flex', width: '100%', minHeight: '90vh'}}
      >
        <FiltersGroup />
        <div style={{width: '100%', padding: '20px'}}>
          {renderBanner()}
          {renderAllProducts()}
        </div>
      </div>
    </LightDarkContainer>
  )
}

export default Home
