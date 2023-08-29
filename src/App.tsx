import './App.css'
import { AddExpense } from './pages'
import ExpensesList from './pages/ExpensesList/ExpensesList'
import { init as apiInit } from './service/api'

apiInit()

function App() {

  return (
    // <ExpensesList />
    <AddExpense />
  )
}

export default App
