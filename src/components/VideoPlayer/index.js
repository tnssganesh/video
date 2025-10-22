import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {RiPlayListAddLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import {AiOutlineDislike, AiOutlineLike} from 'react-icons/ai'
// import React from 'react'
import ReactPlayer from 'react-player'
import Header from '../Header'
// import VideoCard from '../VideoCard'
import FiltersGroup from '../FiltersGroup'
import LanguageContext from '../../context/LanguageContext'
import {LightDarkContainer, LikeAndDisLike} from './styledComponents'
	@@ -19,27 +16,20 @@ const apiStatusConstants = {
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
	@@ -63,19 +53,32 @@ class VideoPlayer extends Component {
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

  renderFailureView = isDark => (
    <div className="products-error-view-container">
      <img
        src={
	@@ -92,125 +95,82 @@ class VideoPlayer extends Component {
      <p className="products-failure-description">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button onClick={this.retry} type="button">
        Retry
      </button>
    </div>
  )

  retry = () => {
    this.getProducts()
  }

  onLike = () => {
    this.setState({isLike: true, isDisLike: false})
  }

  onDisLike = () => {
    this.setState({isDisLike: true, isLike: false})
