import { Link } from 'react-router-dom'
import PageContainer from '../../components/PageContainer/PageContainer'
import WorkProcessCard from '../../components/WorkProcessCard/WorkProcessCard'
import bouwprocessen from '../../data/bouwprocessen.json'

function Theorie() {
  const werkprocessen = bouwprocessen.werkprocessen

  return (
    <PageContainer
      title="Theorie"
      subtitle="Leer de achterliggende theorie per werkproces"
      icon="📚"
    >
      <div style={{
        padding: '1.25rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        borderLeft: '4px solid var(--primary-color)',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.75rem'
        }}>
          Over Theorie
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Hier vind je de theoretische achtergrond van alle werkprocessen in de bouwkunde.
          Selecteer een werkproces om de bijbehorende theorie te bestuderen.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {werkprocessen.map((wp) => (
          <Link
            key={wp.id}
            to={`/theorie/${wp.id}`}
            style={{ textDecoration: 'none' }}
          >
            <WorkProcessCard workProcess={wp} />
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}

export default Theorie
