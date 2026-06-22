import { useState } from 'react'

const initialFormState = {
  title: '',
  amount: '',
  userId: '',
  categoryId: '',
}

function ExpenseForm({ onSubmit, submitLabel = 'Save Expense', initialValues = {} }) {
  const [formData, setFormData] = useState({
    ...initialFormState,
    ...initialValues,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const title = formData.title.trim()
    const amount = Number(formData.amount)
    const userId = Number(formData.userId)
    const categoryId = Number(formData.categoryId)

    if (!title || !formData.amount || !formData.userId || !formData.categoryId) {
      setError('All fields are required.')
      return
    }

    if (![amount, userId, categoryId].every(Number.isFinite)) {
      setError('Amount, User ID, and Category ID must be valid numbers.')
      return
    }

    setSubmitting(true)

    try {
      await onSubmit({
        title,
        amount,
        userId,
        categoryId,
      })
      setFormData(initialFormState)
    } catch (submitError) {
      setError(submitError?.response?.data?.message || submitError.message || 'Unable to save expense.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Lunch, transport, groceries..."
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span>Amount</span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </label>

        <label className="field">
          <span>User ID</span>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="1"
            min="1"
            step="1"
          />
        </label>

        <label className="field">
          <span>Category ID</span>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            placeholder="1"
            min="1"
            step="1"
          />
        </label>
      </div>

      {error ? <div className="form-error">{error}</div> : null}

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ExpenseForm