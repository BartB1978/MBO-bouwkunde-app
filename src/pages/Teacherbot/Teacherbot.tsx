import PageContainer from '../../components/PageContainer/PageContainer'
import TeacherbotComponent from '../../components/Teacherbot/Teacherbot'

function Teacherbot() {
  return (
    <PageContainer
      title="Teacherbot"
      subtitle="Jouw virtuele docent voor alle bouwkunde vragen"
      icon="🤖"
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
          Welkom bij de Teacherbot
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
          De Teacherbot is jouw virtuele docent met uitgebreide kennis van bouwkunde MBO niveau 4.
          In plaats van directe antwoorden te geven, gebruikt de bot de socratische methode om je te helpen zelf tot inzichten te komen.
        </p>
        <ul style={{
          listStyle: 'none',
          paddingLeft: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <li style={{ paddingLeft: '1.5rem', position: 'relative', color: 'var(--text-secondary)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--primary-color)', fontWeight: 700 }}>✓</span>
            Verstand van alle werkprocessen en stadia in de bouw
          </li>
          <li style={{ paddingLeft: '1.5rem', position: 'relative', color: 'var(--text-secondary)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--primary-color)', fontWeight: 700 }}>✓</span>
            Stelt kritische vragen in plaats van directe antwoorden te geven
          </li>
          <li style={{ paddingLeft: '1.5rem', position: 'relative', color: 'var(--text-secondary)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--primary-color)', fontWeight: 700 }}>✓</span>
            Geeft hints wanneer je vastloopt
          </li>
          <li style={{ paddingLeft: '1.5rem', position: 'relative', color: 'var(--text-secondary)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--primary-color)', fontWeight: 700 }}>✓</span>
            Laat je reflecteren op je eigen denkproces
          </li>
        </ul>
      </div>

      <TeacherbotComponent />
    </PageContainer>
  )
}

export default Teacherbot
