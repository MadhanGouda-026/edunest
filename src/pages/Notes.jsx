import { useState } from 'react'

const BRANCHES = [
  { id: 'CS', icon: '💻', full: 'Computer Science' },
  { id: 'ISE', icon: '🖥️', full: 'Information Science' },
  { id: 'ECE', icon: '📡', full: 'Electronics & Comm.' },
  { id: 'EEE', icon: '⚡', full: 'Electrical Engineering' },
  { id: 'ME', icon: '⚙️', full: 'Mechanical Engineering' },
  { id: 'Civil', icon: '🏗️', full: 'Civil Engineering' },
]

function Notes() {
  const [branch, setBranch] = useState('')
  const [sem, setSem] = useState('')
  const notes = JSON.parse(localStorage.getItem('edunest-notes') || '[]')

  const filtered = notes.filter(n =>
    n.branch === branch && n.sem === String(sem)
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

      {/* Branch Select */}
      <div style={{ marginBottom: '0.75rem', color: '#6b6b8a', fontSize: '0.75rem', letterSpacing: '0.08em', fontWeight: 600 }}>
        BRANCH SELECT ಮಾಡಿ
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '0.75rem', marginBottom: '2rem'
      }}>
        {BRANCHES.map(b => (
          <div key={b.id} onClick={() => { setBranch(b.id); setSem('') }} style={{
            background: branch === b.id ? 'rgba(124,109,250,0.12)' : 'var(--card)',
            border: branch === b.id ? '1px solid rgba(124,109,250,0.5)' : '1px solid var(--border)',
            borderRadius: '14px', padding: '1rem',
            textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{b.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: branch === b.id ? '#7c6dfa' : 'var(--text)' }}>{b.id}</div>
          </div>
        ))}
      </div>

      {/* Sem Select */}
      {branch && (
        <>
          <div style={{ marginBottom: '0.75rem', color: '#6b6b8a', fontSize: '0.75rem', letterSpacing: '0.08em', fontWeight: 600 }}>
            SEMESTER SELECT ಮಾಡಿ
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[1,2,3,4,5,6,7,8].map(s => (
              <button key={s} onClick={() => setSem(s)} style={{
                padding: '0.5rem 1.25rem', borderRadius: '8px',
                border: sem === s ? '1px solid rgba(124,109,250,0.5)' : '1px solid var(--border)',
                background: sem === s ? 'rgba(124,109,250,0.12)' : 'var(--card)',
                color: sem === s ? '#7c6dfa' : '#6b6b8a',
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem', fontWeight: 500,
                transition: 'all 0.2s',
              }}>
                Sem {s}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Notes List */}
      {branch && sem && (
        <>
          <div style={{ marginBottom: '0.75rem', color: '#6b6b8a', fontSize: '0.75rem', letterSpacing: '0.08em', fontWeight: 600 }}>
            NOTES — {branch} / SEM {sem}
          </div>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '3rem',
              background: 'var(--card)', borderRadius: '16px',
              border: '1px solid var(--border)', color: '#6b6b8a'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
              <div>ಈ Semester ಗೆ ಇನ್ನೂ Notes Add ಆಗಿಲ್ಲ</div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '0.75rem'
            }}>
              {filtered.map(n => (
                <div key={n.id} style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: '14px', padding: '1rem 1.25rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(109,250,188,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.border = '1px solid var(--border)'}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(109,250,188,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', flexShrink: 0
                  }}>📄</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {n.subject}
                    </div>
                    <div style={{ color: '#6b6b8a', fontSize: '0.72rem', marginTop: '2px' }}>
                      {n.branch} • Sem {n.sem}
                    </div>
                  </div>
                  {n.url && n.url !== '#' && (
                    <a href={n.url} target="_blank" rel="noreferrer" style={{
                      padding: '0.3rem 0.75rem', borderRadius: '6px',
                      background: 'rgba(109,250,188,0.1)',
                      color: '#6dfabc', fontSize: '0.75rem',
                      textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap'
                    }}>
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Notes