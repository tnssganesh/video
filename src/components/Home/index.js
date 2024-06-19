import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {IoMdHome} from 'react-icons/io'
import Header from '../Header'
import VideoCard from '../VideoCard'
import {LightDarkContainer} from './styledComponents'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const homeOptions = [
  {id: 'all?search=', text: 'home'},
  {id: 'trending', text: 'Trending'},
  {id: 'gaming', text: 'Gaming'},
]

class Home extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: homeOptions[0].id,
    activeCategoryId: '',
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
    const {activeOptionId} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/${activeOptionId}`
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
        profileImageUrl: i.profile_image_url,
        viewCount: i.view_count,
        publishedAt: i.published_at,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      // console.log(updatedData)
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

  renderProductsListView = () => {
    const {productsList, activeOptionId} = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map(product => (
            <VideoCard productData={product} key={product.id} />
          ))}
        </ul>
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

  onClickHome = () =>
    this.setState({activeOptionId: 'all?search='}, this.getProducts)

  onClickTrending = () =>
    this.setState({activeOptionId: 'trending'}, this.getProducts)

  onClickGaming = () =>
    this.setState({activeOptionId: 'gaming'}, this.getProducts)

  onClickSaved = () =>
    this.setState({activeOptionId: 'gaming'}, this.getProducts)

  render() {
    const {activeOptionId} = this.state

    return (
      <LightDarkContainer theme={false ? '#424242' : '#f9f9f9'}>
        <ul>
          <li className="rating-item" key="0" onClick={this.onClickHome}>
            <p className="and-up">Home</p>
          </li>
          <li className="rating-item" key="1" onClick={this.onClickTrending}>
            <p className="and-up">Trending</p>
          </li>
          <li className="rating-item" key="2" onClick={this.onClickGaming}>
            <p className="and-up">Gaming</p>
          </li>
          <li className="rating-item" key="3" onClick={this.onClickSaved}>
            <p className="and-up">Saved Videos</p>
          </li>
        </ul>
        {this.renderAllProducts()}
      </LightDarkContainer>
    )
  }
}

export default Home
