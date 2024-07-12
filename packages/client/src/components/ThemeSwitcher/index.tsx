import React from 'react'
import styles from './styles.module.scss'
import useTheme from '../../hooks/useTheme'

const ThemeSwitcher = () => {
  const { theme, updateTheme } = useTheme()

  const handleSwitchTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    await updateTheme(newTheme)
  }

  return (
    <div className={styles.theme_switcher_container}>
      <button
        className={`
          ${styles.theme_switcher} 
          ${theme == 'dark' ? styles.sun : styles.moon}
        `}
        onClick={handleSwitchTheme}></button>
    </div>
  )
}

export default ThemeSwitcher
