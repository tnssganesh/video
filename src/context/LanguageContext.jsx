import React from 'react'

const LanguageContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
  currentOption: 'Home',
  changeOption: () => {},
})

export default LanguageContext
