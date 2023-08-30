import { ExpenseProps } from "../../../types/Expense"


const prepareDataForExport = (expenses: Array<ExpenseProps> | undefined) => {

    if (expenses == null) return []

    const groupedExpenses = groupExpenses(expenses)

    const expenseLogs = format(groupedExpenses)

    return expenseLogs
}

export default prepareDataForExport

/**
 * Group expenses by date, subcategory & wallet.
 * Amount will be summed & desc concatenated.
 * This structure is coming from the Google sheet used to handling the finances.
 * @param expenses 
 * @returns 
 */
const groupExpenses = (expenses: Array<ExpenseProps>) => {

    const groupedExpenses: { [key: string]: ExpenseProps } = {}

    expenses.forEach(expense => {

        const { date, subcategory, wallet } = expense

        const dt = new Date(date!)
        const d = dt.getDate()
        const m = dt.getMonth() + 1
        const y = dt.getFullYear()

        const key = `${subcategory}_${wallet}_${d}${m}${y}`

        if (groupedExpenses[key] == null) {
            groupedExpenses[key] = expense
        } else {
            const tmp = groupedExpenses[key]

            // Using Sheet's format for the amount
            // I don't want to evaluate the expression because I need each amount for archive
            groupedExpenses[key] = {
                ...tmp,
                amount: `=${tmp.amount}+${expense.amount}`,
                description: tmp.description + ', ' + expense.description,
            }
        }
    })

    return groupedExpenses
}

/**
 * Spec: For each item join elements in the following order
 * date;amount;wallet;subcategory;description
 * @param groupedExpenses 
 * @returns 
 */
function format(groupedExpenses: { [key: string]: ExpenseProps }) {
    const keys = Object.keys(groupedExpenses)

    const expenseLogsList: Array<string> = []

    keys.forEach((key) => {
        const { date, amount, wallet, subcategory, description } = groupedExpenses[key]

        const dt = new Date(date)
        const d = dt.getDate().toString().padStart(2, '0')
        const m = (dt.getMonth() + 1).toString().padStart(2, '0')
        const y = dt.getFullYear()

        const itemString = `${d}-${m}-${y};${amount};${wallet};${subcategory};${description}`

        return expenseLogsList.push(itemString)
    }, [])

    return expenseLogsList
}
