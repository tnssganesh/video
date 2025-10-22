import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {IoLogoGameControllerB} from 'react-icons/io'
import Header from '../Header'
	@@ -15,20 +15,14 @@ const apiStatusConstants = {
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
	@@ -50,23 +44,22 @@ class Gaming extends Component {
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

  renderFailureView = isDark => (
    <div className="products-error-view-container">
      <img
        src={
	@@ -81,16 +74,14 @@ class Gaming extends Component {
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
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
	@@ -114,57 +105,41 @@ class Gaming extends Component {
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
            <LightDarkContainer data-testid="gaming" outline={isDark}>
              <Header />
              <div className="homeList">
                <FiltersGroup />
                {this.renderAllProducts(isDark)}
              </div>
            </LightDarkContainer>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default Gaming
