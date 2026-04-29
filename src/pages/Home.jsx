function Home({ setTab }) {
  const branches = [
    { id: 'CS', icon: '💻', full: 'Computer Science' },
    { id: 'ISE', icon: '🖥️', full: 'Information Science' },
    { id: 'ECE', icon: '📡', full: 'Electronics & Comm.' },
    { id: 'EEE', icon: '⚡', full: 'Electrical Engineering' },
    { id: 'ME', icon: '⚙️', full: 'Mechanical Engineering' },
    { id: 'Civil', icon: '🏗️', full: 'Civil Engineering' },
  ]

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{
          display: 'inline-block', padding: '0.4rem 1rem',
          borderRadius: '20px', border: '1px solid rgba(124,109,250,0.3)',
          background: 'rgb(12, 115, 250)',
          color: '#7c6dfa', fontSize: '0.8rem', fontWeight: 600,
          marginBottom: '1.5rem', letterSpacing: '0.05em'
        }}>
          FOR VTU STUDENTS ✦ FREE FOREVER
        </div>

        <h1 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 800, lineHeight: 1.1,
          marginBottom: '1.25rem'
        }}>
          All Notes in One{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7c6dfa, #f6043c)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Nest
          </span>
        </h1>

        <p style={{ color: "#ff0000", fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
          All VTU Branch Notes, All Semester Notes and SGPA & CGPA Calculator — in one place, completely free.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setTab('notes')} style={{
            padding: '0.75rem 2rem', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
            color: '#fff', fontFamily: 'Outfit, sans-serif',
            fontSize: '0.95rem', fontWeight: 700,
            boxShadow: '0 0 30px rgba(124,109,250,0.3)',
            transition: 'opacity 0.2s',
          }}>
            Browse Notes →
          </button>
          <button onClick={() => setTab('calc')} style={{
            padding: '0.75rem 2rem', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgb(230, 13, 245)',
            color: '#eeeeff', fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.95rem', fontWeight: 500,
            transition: 'all 0.2s',
          }}>
            🧮 Calculator
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem', marginBottom: '3rem'
      }}>
        {[
          { num: '6', label: 'Branches' },
          { num: '8', label: 'Semesters' },
          { num: '∞', label: 'Free Notes' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '14px', padding: '1.5rem',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>{s.num}</div>
            <div style={{ color: '#0303e3', fontSize: '0.82rem', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Branches */}
      <div style={{ marginBottom: '0.75rem', color: '#6b6b8a', fontSize: '0.75rem', letterSpacing: '0.08em', fontWeight: 600 }}>
        BROWSE BY BRANCH
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '0.75rem'
      }}>
        {branches.map(b => (
          <div key={b.id} onClick={() => setTab('notes')} style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '14px', padding: '1.25rem 1rem',
            textAlign: 'center', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.border = '1px solid rgba(124,109,250,0.4)'
              e.currentTarget.style.background = 'rgba(124,109,250,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = '1px solid var(--border)'
              e.currentTarget.style.background = 'var(--card)'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{b.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{b.id}</div>
            <div style={{ color: '#00c52b', fontSize: '0.7rem', marginTop: '0.2rem' }}>{b.full}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home