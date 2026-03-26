import { Link } from 'react-router-dom'
import './Dashboard.css'

interface PhaseCard {
  title: string
  subtitle: string
  path: string
  icon: string
  color: string
}

interface ToolCard {
  title: string
  description: string
  path: string
  icon: string
  color: string
}

const phases: PhaseCard[] = [
  {
    title: 'Schets Ontwerp',
    subtitle: 'SO',
    path: '/schets-ontwerp',
    icon: '✏️',
    color: '#3b82f6'
  },
  {
    title: 'Voorlopig Ontwerp',
    subtitle: 'VO',
    path: '/voorlopig-ontwerp',
    icon: '📐',
    color: '#8b5cf6'
  },
  {
    title: 'Definitief Ontwerp',
    subtitle: 'DO',
    path: '/definitief-ontwerp',
    icon: '📋',
    color: '#06b6d4'
  },
  {
    title: 'Technisch Ontwerp',
    subtitle: 'TO',
    path: '/technisch-ontwerp',
    icon: '🔧',
    color: '#10b981'
  },
  {
    title: 'Uitvoerings Ontwerp',
    subtitle: 'UO',
    path: '/uitvoering-ontwerp',
    icon: '🏗️',
    color: '#f59e0b'
  },
  {
    title: 'Oplevering',
    subtitle: 'Afronding',
    path: '/oplevering',
    icon: '✅',
    color: '#14b8a6'
  },
  {
    title: 'Onderhoud',
    subtitle: 'Nazorg',
    path: '/onderhoud',
    icon: '🔨',
    color: '#6366f1'
  },
]

const tools: ToolCard[] = [
  {
    title: 'Interactieve Module',
    description: 'Leer door te doen',
    path: '/interactieve-module',
    icon: '🎮',
    color: '#ec4899'
  },
  {
    title: 'Quiz Module',
    description: 'Test je kennis',
    path: '/quiz',
    icon: '❓',
    color: '#f97316'
  },
  {
    title: 'Theoriepagina',
    description: 'Lees en leer',
    path: '/theorie',
    icon: '📚',
    color: '#0ea5e9'
  },
  {
    title: 'Teacherbot',
    description: 'Stel je vragen',
    path: '/teacherbot',
    icon: '🤖',
    color: '#8b5cf6'
  },
]

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welkom bij MBO Bouwkunde</h1>
        <p className="dashboard-description">
          Ontdek alle ontwerpfasen en leermiddelen voor jouw opleiding
        </p>
      </header>

      <section className="dashboard-section">
        <h2 className="section-title">Ontwerpfasen</h2>
        <div className="phase-grid">
          {phases.map((phase) => (
            <Link
              key={phase.path}
              to={phase.path}
              className="phase-card"
              style={{ '--card-color': phase.color } as React.CSSProperties}
            >
              <div className="phase-card-icon">{phase.icon}</div>
              <div className="phase-card-content">
                <h3 className="phase-card-title">{phase.title}</h3>
                <p className="phase-card-subtitle">{phase.subtitle}</p>
              </div>
              <div className="phase-card-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Leermiddelen</h2>
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="tool-card"
              style={{ '--card-color': tool.color } as React.CSSProperties}
            >
              <div className="tool-card-icon">{tool.icon}</div>
              <h3 className="tool-card-title">{tool.title}</h3>
              <p className="tool-card-description">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
