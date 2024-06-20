import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import NotFound from './components/NotFound'
import Gaming from './components/Gaming'
import VideoPlayer from './components/VideoPlayer'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import LanguageContext from './context/LanguageContext'

import './App.css'

class App extends Component {
  state = {
    isDark: false,
    currentOption: 'Home',
    savedList: [],
  }

  changeTheme = () => {
    this.setState(pre => ({isDark: !pre.isDark}))
  }

  changeOption = id => {
    this.setState({currentOption: id})
  }

  addToSave = item => {
    const {savedList} = this.state
    const savedIds = savedList.map(i => i.id)
    if (savedIds.includes(item.id)) {
      const upList = savedList.filter(i => i.id !== item.id)
      this.setState({savedList: upList})
    } else {
      this.setState(pre => ({savedList: [...pre.savedList, item]}))
    }
  }

  render() {
    const {isDark, currentOption, savedList} = this.state
    // console.log(savedList)
    return (
      <LanguageContext.Provider
        value={{
          isDark,
          currentOption,
          savedList,
          changeOption: this.changeOption,
          changeTheme: this.changeTheme,
          addToSave: this.addToSave,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideoPlayer} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </LanguageContext.Provider>
    )
  }
}

export default App
