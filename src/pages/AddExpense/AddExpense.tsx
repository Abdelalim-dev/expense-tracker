import React, { ChangeEvent, PropsWithChildren } from "react";
import useGoogleSheets from "../../hooks/useGoogleSheets/useGoogleSheets";
import { ExpenseProps, ZodExpenseSchema } from "../../types/Expense";
import { insertExpense } from "../../service/api";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { ToastContainer as Toast, toast } from 'react-toastify';
import DatePicker from "react-date-picker";


const Error = ({ children }: PropsWithChildren) => {
    return <span className="block text-start text-xs text-red-500 mt-1">{children}</span>
}

const AddExpense = () => {

    const { subcategories, wallets } = useGoogleSheets()
    const [amount, setAmount] = React.useState('')
    const [selectedSubcategory, setSelectedSubcategory] = React.useState('')
    const [selectedWallet, setSelectedWallet] = React.useState('')
    const [description, setDescription] = React.useState("")
    const [date, setDate] = React.useState(new Date())

    const [errorAmount, setErrorAmount] = React.useState("")
    const [errorSubcategory, setErrorSubcategory] = React.useState("")
    const [errorWallet, setErrorWallet] = React.useState("")

    function handleSave(): void {
        const [subcategory] = selectedSubcategory?.split('.')

        const data = {
            amount,
            subcategory: subcategory,
            wallet: selectedWallet!,
            description,
            date: date.getTime(),
        }

        const isValid = isValidForm(data)

        if (isValid) submitForm(data)
    }

    function isValidForm(formData: ExpenseProps): boolean {

        const results = ZodExpenseSchema.safeParse(formData)

        if (results.success) return true

        const errors = results.error.format()

        if (errors.amount) setErrorAmount(errors.amount._errors[0])

        if (errors.subcategory) setErrorSubcategory(errors.subcategory._errors[0])

        if (errors.wallet) setErrorWallet(errors.wallet._errors[0])

        return false
    }

    function submitForm(data: ExpenseProps) {

        insertExpense(data)

        cleanupForm()

        toast("Added!", { type: "success" })
    }

    function cleanupForm() {
        setAmount('')
        setSelectedSubcategory('')
        setSelectedWallet('')
        setDescription('')
    }

    function onChangeSubcategory(event: ChangeEvent<HTMLSelectElement>): void {

        setErrorSubcategory('')

        const [subcategory, wallet] = event.target.value.split('.')

        setSelectedSubcategory(`${subcategory}.${wallet}`)

        if (wallet != null) setSelectedWallet(wallet)
    }

    function onChangeWallet(event: ChangeEvent<HTMLSelectElement>): void {

        setErrorWallet('')

        setSelectedWallet(event.target.value)
    }

    function onChangeAmount(event: ChangeEvent<HTMLInputElement>): void {

        setErrorAmount('')

        const _amount = event.target.value

        if (isNaN(Number(_amount))) return

        if (Number(_amount) > 9999999999999) return

        setAmount(_amount)
    }

    function onChangeDescription(event: ChangeEvent<HTMLTextAreaElement>): void {
        setDescription(event.target.value)
    }

    function onChangeDate(value): void {
        console.log(value)
        setDate(value)
    }


    if (!subcategories.length) return <>Loading...</>

    return (<div className="relative flex flex-col">
        <input inputMode="numeric" className="w-full p-2 rounded" placeholder="Amount" value={amount} onChange={onChangeAmount} />
        <Error>{errorAmount}</Error>

        <select id="subcategory" className="w-full mt-2 p-2 rounded"
            value={selectedSubcategory} onChange={onChangeSubcategory}>
            <option value="" disabled>Subcategory</option>
            {
                subcategories.map(({ subcategory, wallet }) =>
                    <option key={subcategory} value={`${subcategory}.${wallet}`}>
                        {subcategory}
                    </option>
                )
            }
        </select>
        <Error>{errorSubcategory}</Error>

        <div className="flex items-center mt-2">
            <div className="flex flex-1">
                <select id="wallet" className="w-full p-2 rounded"
                    value={selectedWallet} onChange={onChangeWallet}>
                    <option value="" disabled>Wallet</option>
                    {
                        wallets.map(({ wallet }) =>
                            <option key={wallet} value={wallet}>
                                {wallet}
                            </option>
                        )
                    }
                </select>
                <Error>{errorWallet}</Error>
            </div>
            <div className="flex-1">
                <DatePicker format="dd-MM-y"
                    value={date} onChange={onChangeDate} />
            </div>
        </div>

        <textarea id="description" placeholder="Description" rows={1} className="w-full mt-2 p-2" value={description} onChange={onChangeDescription} />

        <button className="self-end mt-5 bg-emerald-700 text-white" onClick={handleSave}>Save</button>

        <Toast
            position="top-center"
            autoClose={1000}
        />
    </div>);
}

export default AddExpense;