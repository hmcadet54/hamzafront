'use client'

import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#4a5568',
  fontSize: '0.875rem',
  fontWeight: '500',
  fontFamily: 'Poppins, sans-serif'
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '0.375rem',
  border: '1px solid #e2e8f0',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  fontSize: '0.875rem',
  fontFamily: 'Poppins, sans-serif',
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

  // Create refs for all inputs
  const inputRefs = {
    name: useRef(),
    age: useRef(),
    tel: useRef(),
    address: useRef(),
    comorbids: useRef(),
    diagnosis: useRef(),
    height: useRef(),
    weight: useRef(),
    blood_pressure: useRef(),
    pulse: useRef(),
    temperature: useRef(),
    diagnosis_patient: useRef(),
  }

  // Order of fields for navigation
  const fieldOrder = [
    'name', 'age', 'tel', 'address',
    'height', 'weight', 'blood_pressure', 'pulse', 'temperature', 'sugar', 'bmi', 'diagnosis_patient'
  ]

  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const currentIndex = fieldOrder.indexOf(currentField)
      
      // If it's the last field and all fields are filled, submit the form
      if (currentIndex === fieldOrder.length - 1 && Object.values(formData).every(value => value !== '')) {
        handleSubmit(e)
        return
      }
      
      // Otherwise, move to the next field
      if (currentIndex < fieldOrder.length - 1) {
        const nextField = fieldOrder[currentIndex + 1]
        inputRefs[nextField].current.focus()
      }
    }
  }

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
        height: '',
        weight: '',
        blood_pressure: '',
        pulse: '',
        temperature: '',
        sugar: '',
        bmi: '',
        diagnosis_patient: '',
      })
      // Success message will disappear after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
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
        {fieldOrder.map((field) => (
          <div key={field}>
            <label htmlFor={field} style={labelStyle}>
              {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
            </label>
            <input
              type={field === 'age' || field === 'height' || field === 'weight' || field === 'pulse' ? 'number' : 
                    field === 'temperature' ? 'number' : 
                    field === 'tel' ? 'tel' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, field)}
              ref={inputRefs[field]}
              required
              style={inputStyle}
              step={field === 'temperature' ? '0.1' : '1'}
            />
          </div>
        ))}
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