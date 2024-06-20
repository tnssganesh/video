import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import ProtectedRoute from './components/ProtectedRoute'
import LanguageContext from './context/LanguageContext'

import './App.css'

class App extends Component {
  state = {
    isDark: false,
    currentOption: 'Home',
  }

  changeTheme = () => {
    this.setState(pre => ({isDark: !pre.isDark}))
  }

  changeOption = id => {
    this.setState({currentOption: id})
  }

  render() {
    const {isDark, currentOption} = this.state
    // console.log(isDark)
    return (
      <LanguageContext.Provider
        value={{
          isDark,
          currentOption,
          changeOption: this.changeOption,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
        </Switch>
      </LanguageContext.Provider>
    )
  }
}

export default App
