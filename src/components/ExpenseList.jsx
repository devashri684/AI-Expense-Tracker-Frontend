import { Link } from 'react-router-dom'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ExpenseList({ expenses = [], loading = false, error = '', deletingId = null, onDelete }) {
  if (loading) {
    return <div className="state-card">Loading expenses...</div>
  }

  if (error) {
    return <div className="state-card error-card">{error}</div>
  }

  if (!expenses.length) {
    return <div className="state-card">No expenses found.</div>
  }

  return (
    <div className="table-card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>User ID</th>
              <th>Category ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>
                  <strong>{expense.title}</strong>
                </td>
                <td>{currencyFormatter.format(Number(expense.amount || 0))}</td>
                <td>{expense.userId}</td>
                <td>{expense.categoryId}</td>
                <td>
                  <div className="action-group">
                    <Link className="button button-secondary button-small" to={`/edit/${expense.id}`}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="button button-danger button-small"
                      onClick={() => onDelete(expense.id)}
                      disabled={deletingId === expense.id}
                    >
                      {deletingId === expense.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpenseList