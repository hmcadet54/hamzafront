import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayMode, setDisplayMode] = useState('table'); // 'table' or 'cards'

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://hamza-zeta.vercel.app/api/patients');
        setPatients(response.data);
      } catch (err) {
        setError('Failed to fetch patient data');
        console.error('Error fetching patients:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.875rem',
    transition: 'background-color 0.2s',
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    padding: '1rem',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  };

  const thStyle = {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
  };

  const tdStyle = {
    padding: '1rem',
    borderTop: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    color: '#4a5568',
    fontFamily: 'Poppins, sans-serif',
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Poppins, sans-serif' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red', fontFamily: 'Poppins, sans-serif' }}>
        {error}
      </div>
    );
  }

  const renderTable = () => (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Telephone</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Height (cm)</th>
            <th style={thStyle}>Weight (kg)</th>
            <th style={thStyle}>Blood Pressure</th>
            <th style={thStyle}>Pulse</th>
            <th style={thStyle}>Temperature</th>
            <th style={thStyle}>Sugar</th>
            <th style={thStyle}>BMI</th>
            <th style={thStyle}>Patient Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td style={tdStyle}>{patient.name}</td>
              <td style={tdStyle}>{patient.age}</td>
              <td style={tdStyle}>{patient.tel}</td>
              <td style={tdStyle}>{patient.address}</td>
              <td style={tdStyle}>{patient.height}</td>
              <td style={tdStyle}>{patient.weight}</td>
              <td style={tdStyle}>{patient.blood_pressure}</td>
              <td style={tdStyle}>{patient.pulse}</td>
              <td style={tdStyle}>{patient.temperature}</td>
              <td style={tdStyle}>{patient.sugar}</td>
              <td style={tdStyle}>{patient.bmi}</td>
              <td style={tdStyle}>{patient.diagnosis_patient}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCards = () => (
    <div style={cardContainerStyle}>
      {patients.map((patient) => (
        <div key={patient.id} style={cardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            {patient.name}
          </h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Tel:</strong> {patient.tel}</p>
            <p><strong>BP:</strong> {patient.blood_pressure}</p>
            <p><strong>Pulse:</strong> {patient.pulse}</p>
            <p><strong>Weight:</strong> {patient.weight}kg</p>
            <p><strong>Height:</strong> {patient.height}cm</p>
            <p><strong>Temperature:</strong> {patient.temperature}°C</p>
            <p><strong>BMI:</strong> {patient.bmi}</p>
            <p><strong>Sugar:</strong> {patient.sugar}</p>
            <p><strong>Diagnosis:</strong> {patient.diagnosis_patient}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ 
          color: '#2d3748',
          fontSize: '1.5rem',
          fontWeight: '600',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Patient Records
        </h2>
        <button 
          style={buttonStyle}
          onClick={() => setDisplayMode(displayMode === 'table' ? 'cards' : 'table')}
        >
          Switch to {displayMode === 'table' ? 'Cards' : 'Table'} View
        </button>
      </div>
      {displayMode === 'table' ? renderTable() : renderCards()}
    </div>
  );
} 