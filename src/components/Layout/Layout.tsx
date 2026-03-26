import { ReactNode, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const showBackButton = location.pathname !== '/'

  return (
    <div className="layout">
      <Navigation
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main className="main-content">
        {showBackButton && (
          <button
            onClick={() => navigate('/')}
            style={{
              position: 'fixed',
              top: '1rem',
              right: '1rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              zIndex: 1000,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-dark)'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-color)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            <span style={{ fontSize: '1.125rem' }}>🏠</span>
            Dashboard
          </button>
        )}
        {children}
      </main>
    </div>
  )
}

export default Layout
