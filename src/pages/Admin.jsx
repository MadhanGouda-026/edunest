import { useState, useEffect } from 'react'

const BRANCHES = ['CS', 'ISE', 'ECE', 'EEE', 'ME', 'Civil']
const ADMIN_PASSWORD = 'edunest@admin'

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [notes, setNotes] = useState([])
  const [branch, setBranch] = useState('')
  const [sem, setSem] = useState('')
  const [subject, setSubject] = useState('')
  const [pdfLink, setPdfLink] = useState('')
  const [loginError, setLoginError] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('edunest-notes')
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      setLoginError(false)
    } else {
      setLoginError(true)
    }
  }

  const convertGDriveLink = (link) => {
    // Convert Google Drive link to direct download link
    const fileIdMatch = link.match(/\/d\/([a-zA-Z0-9-_]+)/)
    if (fileIdMatch) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
    }
    return link
  }

  const handleAddNote = () => {
    if (!branch || !sem || !subject.trim() || !pdfLink.trim()) {
      alert('ಎಲ್ಲಾ fields fill ಮಾಡಿ')
      return
    }

    // Validate Google Drive link
    if (!pdfLink.includes('drive.google.com')) {
      alert('Google Drive link enter ಮಾಡಿ (share link)')
      return
    }

    const newNote = {
      id: Date.now(),
      branch,
      sem,
      subject,
      url: convertGDriveLink(pdfLink),
      added: new Date().toLocaleDateString('kn-IN')
    }
    const updated = [...notes, newNote]
    setNotes(updated)
    localStorage.setItem('edunest-notes', JSON.stringify(updated))
    setBranch('')
    setSem('')
    setSubject('')
    setPdfLink('')
    alert('✅ Note added successfully!')
  }

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id)
    setNotes(updated)
    localStorage.setItem('edunest-notes', JSON.stringify(updated))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPassword('')
    setLoginError(false)
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '4rem auto' }}>
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', marginBottom: '0.5rem' }}>
            Admin Login
          </h2>
          <p style={{ color: '#6b6b8a', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Notes manage ಮಾಡಲು password enter ಮಾಡಿ
          </p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg3)',
              color: 'var(--text)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}
          />

          {loginError && (
            <div style={{ color: '#fa6d8f', fontSize: '0.8rem', marginBottom: '1rem' }}>
              ❌ Wrong password
            </div>
          )}

          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.7rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  // Admin Panel
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 800 }}>
          Admin Panel
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1.2rem',
            borderRadius: '8px',
            border: '1px solid rgba(250,109,143,0.3)',
            background: 'rgba(250,109,143,0.08)',
            color: '#fa6d8f',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          Logout
        </button>
      </div>

      {/* Info Box */}
      <div style={{
        background: 'rgba(109,250,188,0.08)',
        border: '1px solid rgba(109,250,188,0.2)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem',
        fontSize: '0.85rem',
        color: '#6dfabc'
      }}>
        ℹ️ Google Drive ಅಲ್ಲಿ PDF upload ಮಾಡಿ, share link copy ಮಾಡಿ, ತಾನು paste ಮಾಡಿ
      </div>

      {/* Add Note Form */}
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Add New Note
        </h2>

        {/* Branch Select */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#6b6b8a' }}>
            Branch
          </label>
          <select
            value={branch}
            onChange={e => setBranch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg3)',
              color: 'var(--text)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.9rem'
            }}
          >
            <option value="">Select Branch</option>
            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Semester Select */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#6b6b8a' }}>
            Semester
          </label>
          <select
            value={sem}
            onChange={e => setSem(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg3)',
              color: 'var(--text)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.9rem'
            }}
          >
            <option value="">Select Sem</option>
            {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Sem {s}</option>)}
          </select>
        </div>

        {/* Subject Input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#6b6b8a' }}>
            Subject Name
          </label>
          <input
            type="text"
            placeholder="e.g., Data Structures"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg3)',
              color: 'var(--text)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.9rem'
            }}
          />
        </div>

        {/* Google Drive Link */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: '#6b6b8a' }}>
            Google Drive Link
          </label>
          <input
            type="text"
            placeholder="https://drive.google.com/file/d/xxxxx/view"
            value={pdfLink}
            onChange={e => setPdfLink(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg3)',
              color: 'var(--text)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.9rem',
              marginBottom: '0.4rem'
            }}
          />
          <div style={{ fontSize: '0.75rem', color: '#6b6b8a' }}>
            💡 Google Drive ಅಲ್ಲಿ share link ಅನ್ನು paste ಮಾಡಿ
          </div>
        </div>

        <button
          onClick={handleAddNote}
          style={{
            width: '100%',
            padding: '0.7rem',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
            color: '#fff',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
          All Notes ({notes.length})
        </h2>

        {notes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            color: '#6b6b8a'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
            <div>No notes added yet</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {notes.slice().reverse().map(n => (
              <div
                key={n.id}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    {n.subject}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b6b8a' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      background: 'rgba(124,109,250,0.15)',
                      color: '#7c6dfa',
                      marginRight: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}>
                      {n.branch}
                    </span>
                    <span>Sem {n.sem}</span>
                    <span style={{ marginLeft: '0.5rem' }}>• {n.added}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {n.url && n.url !== '#' && (
                    <a
                      href={n.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(109,250,188,0.2)',
                        background: 'rgba(109,250,188,0.08)',
                        color: '#6dfabc',
                        textDecoration: 'none',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      View PDF
                    </a>
                  )}
                  <button
                    onClick={() => handleDeleteNote(n.id)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(250,109,143,0.2)',
                      background: 'rgba(250,109,143,0.08)',
                      color: '#fa6d8f',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin