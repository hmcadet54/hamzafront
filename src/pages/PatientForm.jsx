'use client'

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Update the style definitions at the top
const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#4a5568',
  fontSize: '0.875rem',
  fontWeight: '500'
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '0.375rem',
  border: '1px solid #e2e8f0',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s ease',
  outline: 'none',
  '&:focus': {
    borderColor: '#3182ce',
    boxShadow: '0 0 0 1px #3182ce'
  }
}

export default function PatientForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    tel: '',
    address: '',
    comorbids: '',
    diagnosis: '',
    height: '',
    weight: '',
    blood_pressure: '',
    pulse: '',
    temperature: '',
    diagnosis_patient: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post('https://hamza-zeta.vercel.app/api/patients', formData)
      setShowSuccessMessage(true)
      setFormData({
        name: '',
        age: '',
        tel: '',
        address: '',
        comorbids: '',
        diagnosis: '',
        height: '',
        weight: '',
        blood_pressure: '',
        pulse: '',
        temperature: '',
        diagnosis_patient: '',
      })
      setTimeout(() => {
        navigate('/patients')
      }, 1500)
    } catch (error) {
      console.error('Error creating patient:', error)
      alert('Error submitting patient information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: '#2d3748',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        Patient Information Form
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
        </div>
        <div>
          <label htmlFor="age" style={labelStyle}>Age</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required style={inputStyle} />
        </div>
        <div>
          <label htmlFor="tel" style={labelStyle}>Telephone</label>
          <input type="tel" id="tel" name="tel" value={formData.tel} onChange={handleChange} required style={inputStyle} />
        </div>
        <div>
          <label htmlFor="address" style={labelStyle}>Address</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} required style={{...inputStyle, height: '60px'}} />
        </div>
        <div>
          <label htmlFor="comorbids" style={labelStyle}>Comorbidities</label>
          <input type="text" id="comorbids" name="comorbids" value={formData.comorbids} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="diagnosis" style={labelStyle}>Diagnosis</label>
          <input type="text" id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="height" style={labelStyle}>Height (cm)</label>
          <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="weight" style={labelStyle}>Weight (kg)</label>
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="blood_pressure" style={labelStyle}>Blood Pressure</label>
          <input type="text" id="blood_pressure" name="blood_pressure" value={formData.blood_pressure} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="pulse" style={labelStyle}>Pulse</label>
          <input type="number" id="pulse" name="pulse" value={formData.pulse} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="temperature" style={labelStyle}>Temperature (°C)</label>
          <input type="number" id="temperature" name="temperature" value={formData.temperature} onChange={handleChange} step="0.1" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="diagnosis_patient" style={labelStyle}>Patient Diagnosis</label>
          <textarea id="diagnosis_patient" name="diagnosis_patient" value={formData.diagnosis_patient} onChange={handleChange} style={{...inputStyle, height: '60px'}} />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4299e1',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'background-color 0.2s ease',
            opacity: isLoading ? 0.7 : 1,
            pointerEvents: isLoading ? 'none' : 'auto',
            '&:hover': {
              backgroundColor: '#3182ce'
            }
          }}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {showSuccessMessage && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f0fff4',
            color: '#2f855a',
            borderRadius: '0.375rem',
            border: '1px solid #c6f6d5',
            fontSize: '0.875rem'
          }}
        >
          Patient information submitted successfully!
        </div>
      )}
    </div>
  )
}