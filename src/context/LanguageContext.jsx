import React from 'react'

const LanguageContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
})

export default LanguageContext
