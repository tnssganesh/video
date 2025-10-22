import Cookies from 'js-cookie'
import {useState, useEffect, useCallback, useContext} from 'react'
import Loader from 'react-loader-spinner'
import {RiPlayListAddLine} from 'react-icons/ri'
import {AiOutlineDislike, AiOutlineLike} from 'react-icons/ai'
import ReactPlayer from 'react-player'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer, LikeAndDisLike} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const VideoPlayer = props => {
  const {isDark, addToSave, savedList} = useContext(LanguageContext)
  const {match} = props
  const {params} = match
  const {id} = params
  
  const [productsList, setProductsList] = useState({})
  const [isLike, setIsLike] = useState(false)
  const [isDisLike, setIsDisLike] = useState(false)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getProducts = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const i = fetchedData.video_details
      const updatedData = {
        id: i.id,
        title: i.title,
        videoUrl: i.video_url,
        thumbnailUrl: i.thumbnail_url,
        channel: i.channel,
        viewCount: i.view_count,
        publishedAt: i.published_at,
        description: i.description,
      }
      setProductsList(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const retry = () => {
    getProducts()
  }

  const onLike = () => {
    setIsLike(true)
    setIsDisLike(false)
  }

  const onDisLike = () => {
    setIsDisLike(true)
    setIsLike(false)
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
        We are having some trouble to complete your request. Please try again.
      </p>
      <button onClick={retry} type="button">
        Retry
      </button>
    </div>
  )

  const renderProductsListView = () => {
    const ids = savedList.map(i => i.id)
    const onAddToSave = () => {
      addToSave(productsList)
    }

    return (
      <div className="all-products-container">
        <ReactPlayer url={productsList.videoUrl} />
        <p>{productsList.title}</p>
        <p>{productsList.viewCount}</p>
        <p>{productsList.publishedAt}</p>
        <LikeAndDisLike onClick={onLike} outli={isLike} type="button">
          <AiOutlineLike /> Like
        </LikeAndDisLike>
        <LikeAndDisLike
          onClick={onDisLike}
          outli={isDisLike}
          type="button"
        >
          <AiOutlineDislike /> DisLike
        </LikeAndDisLike>
        <LikeAndDisLike
          outli={ids.includes(productsList.id)}
          onClick={onAddToSave}
          type="button"
        >
          <RiPlayListAddLine />
          {ids.includes(productsList.id) ? 'Saved' : 'Save'}
        </LikeAndDisLike>
        <hr />
        <img
          alt="channel logo"
          src={productsList.channel.profile_image_url}
        />
        <p>{productsList.channel.name}</p>
        <p>{productsList.channel.subscriber_count}</p>
        <p>{productsList.description}</p>
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

  return (
    <LightDarkContainer data-testid="videoItemDetails" outline={isDark}>
      <Header />
      <div className="homeList">
        <FiltersGroup />
        {renderAllProducts()}
      </div>
    </LightDarkContainer>
  )
}

export default VideoPlayer
