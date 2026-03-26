import { useParams, Link } from 'react-router-dom'
import PageContainer from '../../components/PageContainer/PageContainer'
import bouwprocessen from '../../data/bouwprocessen.json'

function TheorieDetail() {
  const { id } = useParams<{ id: string }>()
  const werkproces = bouwprocessen.werkprocessen.find(wp => wp.id === id)

  if (!werkproces) {
    return (
      <PageContainer title="Niet gevonden" subtitle="Dit werkproces bestaat niet" icon="❌">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Het gevraagde werkproces kon niet worden gevonden.
          </p>
          <Link to="/theorie" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Terug naar overzicht
          </Link>
        </div>
      </PageContainer>
    )
  }

  const stadium = bouwprocessen.stadia.find(s => s.id === werkproces.stadiumId)

  return (
    <PageContainer
      title={werkproces.naam}
      subtitle={`Werkproces ${werkproces.volgnummer} - ${stadium?.naam}`}
      icon={werkproces.icon}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link to="/theorie" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--primary-color)',
          textDecoration: 'none',
          fontWeight: 600,
          marginBottom: '1.5rem',
          fontSize: '0.9375rem'
        }}>
          ← Terug naar theorie overzicht
        </Link>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
          borderLeft: `4px solid ${stadium?.color || 'var(--primary-color)'}`
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Beschrijving
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            fontSize: '1.0625rem'
          }}>
            {werkproces.beschrijving}
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Belangrijkste Activiteiten
          </h2>
          <ul style={{
            listStyle: 'none',
            paddingLeft: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {werkproces.activiteiten.map((activiteit, index) => (
              <li key={index} style={{
                paddingLeft: '2rem',
                position: 'relative',
                color: 'var(--text-secondary)',
                fontSize: '1.0625rem',
                lineHeight: 1.6
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '0.25rem',
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: stadium?.color || 'var(--primary-color)',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {index + 1}
                </span>
                {activiteit}
              </li>
            ))}
          </ul>
        </div>

        {stadium && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Stadium: {stadium.naam}
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '1rem',
              fontSize: '1.0625rem'
            }}>
              {stadium.beschrijving}
            </p>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              borderLeft: `3px solid ${stadium.color}`
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                Doel van dit stadium
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9375rem',
                lineHeight: 1.6
              }}>
                {stadium.doel}
              </p>
            </div>
          </div>
        )}

        <div style={{
          padding: '1.5rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--primary-color)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}>
            Hulp nodig?
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1rem',
            fontSize: '0.9375rem'
          }}>
            Heb je vragen over dit werkproces? Gebruik de Teacherbot om je kennis te verdiepen via de socratische methode.
          </p>
          <Link to="/teacherbot" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9375rem'
          }}>
            Ga naar Teacherbot
          </Link>
        </div>
      </div>
    </PageContainer>
  )
}

export default TheorieDetail
