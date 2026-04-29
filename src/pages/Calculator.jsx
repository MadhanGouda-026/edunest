import { useState } from 'react'

const GRADES = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, C: 5, P: 4, F: 0 }

function Calculator() {
  const [calcMode, setCalcMode] = useState('sgpa')
  const [subjects, setSubjects] = useState([{ id: 1, name: '', credits: 4, grade: 'O' }])
  const [semesters, setSemesters] = useState([{ id: 1, sgpa: 0, credits: 24 }])
  const [sgpaResult, setSgpaResult] = useState(null)
  const [cgpaResult, setCgpaResult] = useState(null)
  const nextId = { subj: Math.max(...subjects.map(s => s.id), 0) + 1, sem: Math.max(...semesters.map(s => s.id), 0) + 1 }

  const calcSGPA = () => {
    let totalCredits = 0, totalPoints = 0
    subjects.forEach(s => {
      totalCredits += parseInt(s.credits) || 0
      totalPoints += (parseInt(s.credits) || 0) * (GRADES[s.grade] || 0)
    })
    if (!totalCredits) { alert('Credits add ಮಾಡಿ'); return }
    const sgpa = (totalPoints / totalCredits).toFixed(2)
    setSgpaResult({ sgpa, grade: getGrade(sgpa) })
  }

  const calcCGPA = () => {
    let totalCredits = 0, totalPoints = 0
    semesters.forEach(s => {
      totalCredits += parseInt(s.credits) || 0
      totalPoints += (parseFloat(s.sgpa) || 0) * (parseInt(s.credits) || 0)
    })
    if (!totalCredits) { alert('Semester add ಮಾಡಿ'); return }
    const cgpa = (totalPoints / totalCredits).toFixed(2)
    setCgpaResult({ cgpa, grade: getGrade(cgpa) })
  }

  const getGrade = (gpa) => {
    gpa = parseFloat(gpa)
    if (gpa >= 9) return '🌟 Outstanding'
    if (gpa >= 8) return '⭐ Excellent'
    if (gpa >= 7) return '✨ Very Good'
    if (gpa >= 6) return '👍 Good'
    if (gpa >= 5) return '📊 Average'
    return '📈 Needs Improvement'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {['sgpa', 'cgpa'].map(mode => (
          <button key={mode} onClick={() => {
            setCalcMode(mode)
            setSgpaResult(null)
            setCgpaResult(null)
          }} style={{
            padding: '0.5rem 1.5rem', borderRadius: '10px',
            border: calcMode === mode ? '1px solid rgba(124,109,250,0.5)' : '1px solid var(--border)',
            background: calcMode === mode ? 'rgba(124,109,250,0.12)' : 'var(--card)',
            color: calcMode === mode ? '#7c6dfa' : '#6b6b8a',
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 600,
            transition: 'all 0.2s',
          }}>
            {mode === 'sgpa' ? '📊 SGPA' : '📈 CGPA'}
          </button>
        ))}
      </div>

      {/* SGPA Mode */}
      {calcMode === 'sgpa' && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            SGPA Calculator
          </h2>

          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 70px 70px auto',
            gap: '0.5rem', marginBottom: '0.75rem', color: '#6b6b8a', fontSize: '0.7rem', fontWeight: 600
          }}>
            <span>Subject</span>
            <span>Credits</span>
            <span>Grade</span>
            <span></span>
          </div>

          {/* Subjects */}
          {subjects.map((s, idx) => (
            <div key={s.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 70px 70px auto',
              gap: '0.5rem', marginBottom: '0.5rem'
            }}>
              <input type="text" placeholder="Subject" value={s.name} onChange={e => {
                const new_subj = [...subjects]
                new_subj[idx].name = e.target.value
                setSubjects(new_subj)
              }} style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '0.5rem 0.75rem', color: 'var(--text)',
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem'
              }} />

              <input type="number" min="1" max="4" value={s.credits} onChange={e => {
                const new_subj = [...subjects]
                new_subj[idx].credits = e.target.value
                setSubjects(new_subj)
              }} style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '0.5rem 0.75rem', color: 'var(--text)',
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem'
              }} />

              <select value={s.grade} onChange={e => {
                const new_subj = [...subjects]
                new_subj[idx].grade = e.target.value
                setSubjects(new_subj)
              }} style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '0.5rem 0.5rem', color: 'var(--text)',
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem'
              }}>
                {Object.keys(GRADES).map(g => <option key={g}>{g}</option>)}
              </select>

              <button onClick={() => setSubjects(subjects.filter((_, i) => i !== idx))} style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(250,109,143,0.1)', border: '1px solid rgba(250,109,143,0.2)',
                color: '#fa6d8f', fontSize: '1rem', fontWeight: 700
              }}>
                ×
              </button>
            </div>
          ))}

          <button onClick={() => setSubjects([...subjects, { id: nextId.subj, name: '', credits: 4, grade: 'O' }])} style={{
            width: '100%', padding: '0.6rem', marginTop: '0.75rem', marginBottom: '1rem',
            borderRadius: '8px', border: '1px dashed rgba(124,109,250,0.3)',
            background: 'rgba(124,109,250,0.05)', color: '#7c6dfa',
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 500
          }}>
            + Add Subject
          </button>

          <button onClick={calcSGPA} style={{
            width: '100%', padding: '0.8rem',
            borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
            color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', fontWeight: 700
          }}>
            Calculate SGPA
          </button>

          {sgpaResult && (
            <div style={{
              marginTop: '1.5rem', padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(124,109,250,0.1), rgba(250,109,143,0.08))',
              border: '1px solid rgba(124,109,250,0.3)', borderRadius: '14px', textAlign: 'center'
            }}>
              <div style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '3rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                {sgpaResult.sgpa}
              </div>
              <div style={{ color: '#6b6b8a', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                {sgpaResult.grade}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CGPA Mode */}
      {calcMode === 'cgpa' && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            CGPA Calculator
          </h2>

          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '60px 1fr 1fr auto',
            gap: '0.5rem', marginBottom: '0.75rem', color: '#6b6b8a', fontSize: '0.7rem', fontWeight: 600
          }}>
            <span>Sem</span>
            <span>SGPA</span>
            <span>Credits</span>
            <span></span>
          </div>

          {/* Semesters */}
          {semesters.map((s, idx) => (
            <div key={s.id} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 1fr auto',
              gap: '0.5rem', marginBottom: '0.5rem'
            }}>
              <div style={{ color: '#6b6b8a', paddingTop: '0.5rem' }}>Sem {idx + 1}</div>

              <input type="number" min="0" max="10" step="0.01" placeholder="SGPA" value={s.sgpa} onChange={e => {
                const new_sem = [...semesters]
                new_sem[idx].sgpa = e.target.value
                setSemesters(new_sem)
              }} style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '0.5rem 0.75rem', color: 'var(--text)',
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem'
              }} />

              <input type="number" min="1" value={s.credits} onChange={e => {
                const new_sem = [...semesters]
                new_sem[idx].credits = e.target.value
                setSemesters(new_sem)
              }} style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '0.5rem 0.75rem', color: 'var(--text)',
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem'
              }} />

              <button onClick={() => setSemesters(semesters.filter((_, i) => i !== idx))} style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(250,109,143,0.1)', border: '1px solid rgba(250,109,143,0.2)',
                color: '#fa6d8f', fontSize: '1rem', fontWeight: 700
              }}>
                ×
              </button>
            </div>
          ))}

          <button onClick={() => setSemesters([...semesters, { id: nextId.sem, sgpa: 0, credits: 24 }])} style={{
            width: '100%', padding: '0.6rem', marginTop: '0.75rem', marginBottom: '1rem',
            borderRadius: '8px', border: '1px dashed rgba(124,109,250,0.3)',
            background: 'rgba(124,109,250,0.05)', color: '#7c6dfa',
            fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 500
          }}>
            + Add Semester
          </button>

          <button onClick={calcCGPA} style={{
            width: '100%', padding: '0.8rem',
            borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
            color: '#fff', fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', fontWeight: 700
          }}>
            Calculate CGPA
          </button>

          {cgpaResult && (
            <div style={{
              marginTop: '1.5rem', padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(124,109,250,0.1), rgba(250,109,143,0.08))',
              border: '1px solid rgba(124,109,250,0.3)', borderRadius: '14px', textAlign: 'center'
            }}>
              <div style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '3rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #7c6dfa, #fa6d8f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                {cgpaResult.cgpa}
              </div>
              <div style={{ color: '#6b6b8a', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                {cgpaResult.grade}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Calculator