import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
	@@ -16,20 +16,14 @@ const apiStatusConstants = {
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
	@@ -52,19 +46,22 @@ class Trending extends Component {
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
	@@ -82,20 +79,14 @@ class Trending extends Component {
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
	@@ -119,57 +110,41 @@ class Trending extends Component {
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
