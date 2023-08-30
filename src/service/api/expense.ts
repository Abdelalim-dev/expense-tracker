import { ExpenseProps } from "../../types/Expense"
import * as FirebaseHandler from '../firebase'

export const getExpenses = (callback: (data: any) => void) => {
    return FirebaseHandler.getExpenses(callback)
}
export const insertExpense = (data: ExpenseProps) => {
    FirebaseHandler.insertExpense(data)
}
export const wipeData = () => {
    FirebaseHandler.wipeData()
}