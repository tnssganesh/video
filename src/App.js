import {Route, Switch, Redirect} from 'react-router-dom'
import {useState, useCallback, useMemo} from 'react'
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

const App = () => {
  const [isDark, setIsDark] = useState(false)
  const [currentOption, setCurrentOption] = useState('Home')
  const [savedList, setSavedList] = useState([])

  const changeTheme = useCallback(() => {
    setIsDark(prevIsDark => !prevIsDark)
  }, [])

  const changeOption = useCallback(id => {
    setCurrentOption(id)
  }, [])

  const addToSave = useCallback(item => {
    setSavedList(prevSavedList => {
      const savedIds = prevSavedList.map(i => i.id)
      if (savedIds.includes(item.id)) {
        return prevSavedList.filter(i => i.id !== item.id)
      } else {
        return [...prevSavedList, item]
      }
    })
  }, [])

  const contextValue = useMemo(() => ({
    isDark,
    currentOption,
    savedList,
    changeOption,
    changeTheme,
    addToSave,
  }), [isDark, currentOption, savedList, changeOption, changeTheme, addToSave])

  return (
    <LanguageContext.Provider value={contextValue}>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute exact path="/gaming" component={Gaming} />
        <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
        <ProtectedRoute exact path="/videos/:id" component={VideoPlayer} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </LanguageContext.Provider>
  )
}

export default App
