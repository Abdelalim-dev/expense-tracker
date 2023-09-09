import React, { MouseEvent } from "react"
import ListItem from "./ListItem"
import { ExpenseProps } from "../../types/Expense"
import { getExpenses, wipeData } from "../../service/api"
import prepareDataForExport from "./utils/export"

import { ToastContainer, toast } from "react-toastify"


const ExpensesList = () => {

    const [expenses, setExpenses] = React.useState<ExpenseProps[] | undefined>(undefined)

    React.useEffect(() => {

        const unsubscribe = getExpenses(data => {

            if (data == null) return setExpenses([])

            const keys = Object.keys(data)

            const _expenses = keys.map(key => ({ key, ...data[key] })) as Array<ExpenseProps>

            // Most recent on top
            const sorted = _expenses.sort((a: ExpenseProps, b: ExpenseProps) => b.date - a.date)

            setExpenses(sorted)
        })

        return () => unsubscribe()
    }, [])

    function handleExport(): void {
        const expenseLogs = prepareDataForExport(expenses)

        navigator.clipboard.writeText(expenseLogs.join('\n'));

        toast("Copied to clipboard", { type: "success" })
    }

    function handleDataWipe(event: MouseEvent<HTMLAnchorElement>): void {
        event.preventDefault()
        const confirmed = confirm("Delete all data permanently")
        if (confirmed) {
            wipeData()
        }
    }

    if (!expenses) return <>Loading...</>

    return (
        <div className="max-h-[54vh] overflow-y-scroll">
            <div className="">
                {expenses.map((item) =>
                    <ListItem key={item.key} item={item} />)}
            </div>

            {!!expenses.length ?
                < div className="sticky bottom-0 mt-2 py-2 flex justify-between items-center bg-zinc-100 dark:bg-zinc-900">

                    <a href="#" onClick={handleDataWipe}
                        className="text-sm text-red-600 dark:text-red-500 hover:underline">
                        Clear
                    </a>

                    <button className="bg-emerald-700" onClick={handleExport}>
                        Export
                    </button>
                </div> :
                <>No items</>
            }

            <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
        </div >
    )
}

export default ExpensesList