import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ExpenseForm from '../components/ExpenseForm.jsx'
import { addExpense } from '../services/api.js'

function AddExpense() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')

  const handleSubmit = async (expense) => {
    setApiError('')
    try {
      await addExpense(expense)
      navigate('/')
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message || 'Failed to create expense'
      console.error('API Error:', error)
      setApiError(errorMsg)
    }
  }

  return (
    <section className="page-stack">
      <div className="hero-card card">
        <div>
          <p className="eyebrow">Expense Tracker</p>
          <h1>Add Expense</h1>
          <p className="hero-copy">Create a new expense and return to the dashboard after saving.</p>
        </div>

        <Link className="button button-secondary" to="/">
          Back to Dashboard
        </Link>
      </div>

      {apiError ? <div className="state-card error-card">{apiError}</div> : null}

      <ExpenseForm onSubmit={handleSubmit} submitLabel="Create Expense" />
    </section>
  )
}

export default AddExpense