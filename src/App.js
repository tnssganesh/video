import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import LanguageContext from './context/LanguageContext'

import './App.css'

class App extends Component {
  state = {
    isDark: false,
  }

  changeTheme = () => {
    this.setState(pre => ({isDark: !pre.isDark}))
  }

  render() {
    const {isDark} = this.state
    // console.log(isDark)
    return (
      <LanguageContext.Provider value={{isDark, changeTheme: this.changeTheme}}>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </LanguageContext.Provider>
    )
  }
}

export default App
