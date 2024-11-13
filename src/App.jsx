import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PatientForm from './pages/PatientForm'
import PatientList from './pages/PatientList'

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav style={{
          backgroundColor: 'white',
          padding: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            gap: '2rem',
            margin: 0,
            padding: 0,
            justifyContent: 'center'
          }}>
            <li>
              <Link to="/" style={linkStyle}>Add Patient</Link>
            </li>
            <li>
              <Link to="/patients" style={linkStyle}>View Patients</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<PatientForm />} />
          <Route path="/patients" element={<PatientList />} />
        </Routes>
      </div>
    </Router>
  )
}

// Navigation link styles
const linkStyle = {
  textDecoration: 'none',
  color: '#4299e1',
  fontWeight: '500',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  transition: 'background-color 0.2s ease',
  fontFamily: 'Poppins, sans-serif',
  ':hover': {
    backgroundColor: '#ebf8ff'
  }
}

export default App
