import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'
import './Navigation.css'

interface NavigationProps {
  isOpen: boolean
  onToggle: () => void
}

interface NavItem {
  path: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/schets-ontwerp', label: 'Schets Ontwerp (SO)', icon: '✏️' },
  { path: '/voorlopig-ontwerp', label: 'Voorlopig Ontwerp (VO)', icon: '📐' },
  { path: '/definitief-ontwerp', label: 'Definitief Ontwerp (DO)', icon: '📋' },
  { path: '/technisch-ontwerp', label: 'Technisch Ontwerp (TO)', icon: '🔧' },
  { path: '/uitvoering-ontwerp', label: 'Uitvoerings Ontwerp (UO)', icon: '🏗️' },
  { path: '/oplevering', label: 'Oplevering', icon: '✅' },
  { path: '/onderhoud', label: 'Onderhoud', icon: '🔨' },
]

const toolItems: NavItem[] = [
  { path: '/interactieve-module', label: 'Interactieve Module', icon: '🎮' },
  { path: '/quiz', label: 'Quiz Module', icon: '❓' },
  { path: '/theorie', label: 'Theorie', icon: '📚' },
  { path: '/teacherbot', label: 'Teacherbot', icon: '🤖' },
]

function Navigation({ isOpen, onToggle }: NavigationProps) {
  const location = useLocation()
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('mbo-bouwkunde-theme')
    return saved === 'dark'
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('mbo-bouwkunde-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('mbo-bouwkunde-theme', 'light')
    }
  }, [isDark])

  return (
    <>
      <button className="mobile-menu-toggle" onClick={onToggle}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`navigation ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h1 className="nav-title">MBO Bouwkunde</h1>
          <p className="nav-subtitle">Niveau 4</p>
        </div>

        <div className="nav-progress">
          <ProgressBar />
        </div>

        <div className="nav-section">
          <h2 className="nav-section-title">Ontwerpfasen</h2>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => window.innerWidth <= 1024 && onToggle()}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <h2 className="nav-section-title">Leermiddelen</h2>
          <ul className="nav-list">
            {toolItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => window.innerWidth <= 1024 && onToggle()}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-footer">
          <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
            <span className="theme-icon">{isDark ? '☀️' : '🌙'}</span>
            <span className="theme-label">{isDark ? 'Licht' : 'Donker'}</span>
          </button>
        </div>
      </nav>

      {isOpen && <div className="nav-overlay" onClick={onToggle}></div>}
    </>
  )
}

export default Navigation
