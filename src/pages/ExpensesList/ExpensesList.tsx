import React, { MouseEvent } from "react"
import ListItem from "./ListItem"
import { ExpenseProps } from "../../types/Expense"
import { getExpenses, wipeData } from "../../service/api"


const ExpensesList = () => {

    const [expenses, setExpenses] = React.useState<ExpenseProps[] | undefined>(undefined)

    React.useEffect(() => {

        const unsubscribe = getExpenses(data => {

            if (data == null) return setExpenses([])

            const keys = Object.keys(data)

            const _expenses = keys.map(key => ({ key, ...data[key] })) as Array<ExpenseProps>

            setExpenses(_expenses)
        })

        return () => unsubscribe()
    }, [])

    function handleExport(): void {
        alert('Exporting...!')
    }

    function handleDataWipe(event: MouseEvent<HTMLAnchorElement>): void {
        event.preventDefault()
        const confirmed = confirm("Delete all data permanently")
        if (confirmed) {
            wipeData()
        }
    }

    if (!expenses) return <>Loading...</>

    return (<div className="h-full relative">
        {expenses.map((item) =>
            <ListItem key={item.key} item={item} />)}

        <div className="absolute bottom-0 w-full">
            <button className="w-full mb-2 bg-emerald-700"
                onClick={handleExport}
            >Export</button>

            <a href="#" onClick={handleDataWipe}
                className="text-sm text-red-600 dark:text-red-500 hover:underline">
                Clear
            </a>
        </div>

    </div>)
}

export default ExpensesList