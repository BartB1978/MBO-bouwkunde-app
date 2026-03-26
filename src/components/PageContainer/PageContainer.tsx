import { ReactNode } from 'react'
import './PageContainer.css'

interface PageContainerProps {
  title: string
  subtitle?: string
  icon?: string
  children: ReactNode
}

function PageContainer({ title, subtitle, icon, children }: PageContainerProps) {
  return (
    <div className="page-container">
      <header className="page-header">
        {icon && <div className="page-icon">{icon}</div>}
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </header>
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default PageContainer
