function Navbar({ tab, setTab }) {
  const links = [
    { id: 'home', label: '🏠 Home' },
    { id: 'notes', label: '📚 Notes' },
    { id: 'calc', label: '🧮 Calculator' },
  ]

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: '64px',
      background: 'rgba(5,5,8,0.9)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(20px)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>

      {/* Logo */}
      <div style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '1.6rem', fontWeight: 800,
        background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>
        EduNest
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
        {links.map(l => (
          <button key={l.id} onClick={() => setTab(l.id)} style={{
            padding: '0.45rem 1.1rem',
            borderRadius: '8px', border: 'none',
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem',
            fontWeight: tab === l.id ? 600 : 400,
            background: tab === l.id ? 'rgba(124,109,250,0.15)' : 'transparent',
            color: tab === l.id ? '#7c6dfa' : '#6b6b8a',
            transition: 'all 0.2s',
          }}>
            {l.label}
          </button>
        ))}

        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {links.map(l => (
             <button key={l.id} onClick={() => setTab(l.id)} style={{
               padding: '0.45rem 1.1rem',
               borderRadius: '8px', border: 'none',
               fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem',
               fontWeight: tab === l.id ? 600 : 400,
               background: tab === l.id ? 'rgba(124,109,250,0.15)' : 'transparent',
               color: tab === l.id ? '#7c6dfa' : '#6b6b8a',
               transition: 'all 0.2s',
             }}>
              {l.label}
             </button>
         ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar