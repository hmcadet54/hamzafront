import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  };

  const tdStyle = {
    padding: '1rem',
    borderTop: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    color: '#4a5568',
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: '#2d3748',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        Patient Records
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Telephone</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Comorbidities</th>
              <th style={thStyle}>Diagnosis</th>
              <th style={thStyle}>Height (cm)</th>
              <th style={thStyle}>Weight (kg)</th>
              <th style={thStyle}>Blood Pressure</th>
              <th style={thStyle}>Pulse</th>
              <th style={thStyle}>Temperature</th>
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
                <td style={tdStyle}>{patient.comorbids}</td>
                <td style={tdStyle}>{patient.diagnosis}</td>
                <td style={tdStyle}>{patient.height}</td>
                <td style={tdStyle}>{patient.weight}</td>
                <td style={tdStyle}>{patient.blood_pressure}</td>
                <td style={tdStyle}>{patient.pulse}</td>
                <td style={tdStyle}>{patient.temperature}</td>
                <td style={tdStyle}>{patient.diagnosis_patient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 