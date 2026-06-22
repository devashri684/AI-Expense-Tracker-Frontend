import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/expenses',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add error interceptor to log and format errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    })
    return Promise.reject(error)
  },
)

const extractData = (response) => response.data

export const getAllExpenses = async () => {
  const response = await api.get('/')
  return extractData(response)
}

export const addExpense = async (expense) => {
  const response = await api.post('/', expense)
  return extractData(response)
}

export const getExpenseById = async (id) => {
  const response = await api.get(`/${id}`)
  return extractData(response)
}

export const deleteExpense = async (id) => {
  const response = await api.delete(`/${id}`)
  return extractData(response)
}

export const updateExpense = async (id, expense) => {
  const response = await api.put(`/${id}`, expense)
  return extractData(response)
}

export const getExpensesByUser = async (userId) => {
  const response = await api.get(`/user/${userId}`)
  return extractData(response)
}

export default api