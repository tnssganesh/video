import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {RiPlayListAddLine} from 'react-icons/ri'
import {AiOutlineDislike, AiOutlineLike} from 'react-icons/ai'
// import React from 'react'
import ReactPlayer from 'react-player'
import Header from '../Header'
// import VideoCard from '../VideoCard'
import FiltersGroup from '../FiltersGroup'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoPlayer extends Component {
  state = {
    productsList: {},
    isLike: false,
    isDisLike: false,
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
    const {match} = this.props
    const {params} = match
    const {id} = params

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
        name: i.name,
        viewCount: i.view_count,
        publishedAt: i.published_at,
        description: i.description,
      }
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
        const {productsList} = this.state
        const shouldShowProductsList = true
        const {addToSave} = value
        const onAddToSave = () => {
          addToSave(productsList)
        }

        // console.log(productsList)
        return shouldShowProductsList ? (
          <div className="all-products-container">
            <ReactPlayer url={productsList.videoUrl} />
            <p>{productsList.title}</p>
            <p>{productsList.viewCount}</p>
            <p>{productsList.publishedAt}</p>
            <button type="button">
              <AiOutlineLike /> Like
            </button>
            <button type="button">
              <AiOutlineDislike /> DisLike
            </button>
            <button onClick={onAddToSave} type="button">
              <RiPlayListAddLine /> Save
            </button>
            <hr />
            <img alt="pr" src={productsList.channel.profile_image_url} />
            <p>{productsList.channel.name}</p>
            <p>{productsList.channel.subscriber_count}</p>
            <p>{productsList.description}</p>
          </div>
        ) : (
          <div className="no-products-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              className="no-products-img"
              alt="no products"
            />
            <h1 className="no-products-heading">No Products Found</h1>
            <p className="no-products-description">
              We could not find any products. Try other filters.
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

export default VideoPlayer
