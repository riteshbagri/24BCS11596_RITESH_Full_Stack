import { useState } from 'react'
import ThemeContext from './context/ThemeContext'
import { useState } from 'react';


function App() {
 const [Theme,setTheme]=useState('dark');

  return (
    <>
    <ThemeContext.Provider value={Theme,setTheme}>
      <h2>Theme Context</h2>
      <h2>Current theme is:{Theme}</h2>
    </ThemeContext.Provider>
    </>
  )
}

export default App
