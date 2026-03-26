import { useEffect, useState } from 'react'
import { loadProgress, BADGES, getXPForNextLevel, getXPProgress } from '../../utils/gamification'
import './ProgressBar.css'

function ProgressBar() {
  const [progress, setProgress] = useState(loadProgress())
  const [showBadges, setShowBadges] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(loadProgress())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const nextLevelXP = getXPForNextLevel(progress.totalXP)
  const xpProgress = getXPProgress(progress.totalXP)
  const earnedBadges = BADGES.filter(b => progress.badges.includes(b.id))

  return (
    <div className="progress-bar-widget">
      <div className="progress-header">
        <div className="level-badge">
          <span className="level-icon">🎓</span>
          <span className="level-number">Lvl {progress.level}</span>
        </div>
        <div className="xp-info">
          <span className="xp-current">{progress.totalXP} XP</span>
          <span className="xp-next">/ {nextLevelXP} XP</span>
        </div>
      </div>

      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${xpProgress}%` }}></div>
      </div>

      <button className="badges-button" onClick={() => setShowBadges(!showBadges)}>
        <span>Badges</span>
        <span className="badge-count">{earnedBadges.length}/{BADGES.length}</span>
      </button>

      {showBadges && (
        <div className="badges-modal" onClick={() => setShowBadges(false)}>
          <div className="badges-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="badges-title">Behaalde Badges</h3>
            <div className="badges-grid">
              {BADGES.map(badge => {
                const earned = progress.badges.includes(badge.id)
                return (
                  <div key={badge.id} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
                    <div className="badge-icon">{badge.icon}</div>
                    <div className="badge-name">{badge.naam}</div>
                    <div className="badge-description">{badge.beschrijving}</div>
                  </div>
                )
              })}
            </div>
            <button className="close-button" onClick={() => setShowBadges(false)}>
              Sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressBar
