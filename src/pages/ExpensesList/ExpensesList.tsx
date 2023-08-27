import React, { MouseEvent } from "react"
import ListItem from "./ListItem"
import { ExpenseProps } from "../../types/Expense"


const ExpensesList = () => {
    const [expensesList, setExpensesList] = React.useState<ExpenseProps[]>([
        {
            "date": "22-08-2023",
            "amount": "40+140+100",
            "wallet": "Groceries",
            "subcategory": "Groceries",
            "description": "bread, milk, flour"
        }, {
            "date": "22-08-2023",
            "amount": "160",
            "wallet": "Groceries",
            "subcategory": "Veggies",
            "description": "tomatoes"
        },
    ])

    function handleExport(): void {
        alert('Exporting...!')
    }

    function handleDataWipe(event: MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        event.preventDefault()
        alert('Clearing....')
    }

    return (<div className="h-full relative">
        {expensesList.map((expenseItem) =>
            <ListItem item={expenseItem} />)}

        <div className="absolute bottom-0 w-full">
            <button className="w-full mb-2"
                onClick={handleExport}
            >Export</button>
            <a href="#" onClick={handleDataWipe} className="text-sm text-red-600 dark:text-red-500 hover:underline">Clear</a>
        </div>

    </div>)
}

export default ExpensesList