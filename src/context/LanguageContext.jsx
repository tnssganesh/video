import React from 'react'

const LanguageContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
  currentOption: 'Home',
  changeOption: () => {},
  savedList: [],
  addToSave: () => {},
})

export default LanguageContext
