import React, { ChangeEvent, PropsWithChildren } from "react";
import useGoogleSheets from "../../hooks/useGoogleSheets/useGoogleSheets";
import { ExpenseProps, ZodExpenseSchema } from "../../types/Expense";
import { insertExpense } from "../../service/api";

import { ToastContainer as Toast, toast } from 'react-toastify';


const Label = ({ htmlFor, children }: PropsWithChildren & { htmlFor: string }) => {
    return <label htmlFor={htmlFor} className="block text-start mt-6 text-sm text-gray-300">{children}</label>
}

const Error = ({ children }: PropsWithChildren) => {
    return <span className="block text-start text-xs text-red-500 mt-1">{children}</span>
}

const AddExpense = () => {

    const { subcategories, wallets } = useGoogleSheets()
    const [amount, setAmount] = React.useState('')
    const [selectedSubcategory, setSelectedSubcategory] = React.useState('')
    const [selectedWallet, setSelectedWallet] = React.useState('')
    const [description, setDescription] = React.useState("")

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
            date: new Date().getTime(),
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

    if (!subcategories.length) return <>Loading...</>

    return (<div className="min-w-[320px] relative flex flex-col h-full max-h-[80vh]">
        <input inputMode="numeric" className="w-full p-2 rounded" placeholder="Amount" value={amount} onChange={onChangeAmount} />
        <Error>{errorAmount}</Error>

        <Label htmlFor="subcategory">Category</Label>
        <select id="subcategory" className="w-full mt-2 p-2 rounded"
            value={selectedSubcategory} onChange={onChangeSubcategory}>
            <option value="" disabled>None</option>
            {
                subcategories.map(({ subcategory, wallet }) =>
                    <option key={subcategory} value={`${subcategory}.${wallet}`}>
                        {subcategory}
                    </option>
                )
            }
        </select>
        <Error>{errorSubcategory}</Error>

        <Label htmlFor="wallet">Wallet</Label>
        <select id="wallet" className="w-full mt-2 p-2 rounded"
            value={selectedWallet} onChange={onChangeWallet}>
            <option value="" disabled>None</option>
            {
                wallets.map(({ wallet }) =>
                    <option key={wallet} value={wallet}>
                        {wallet}
                    </option>
                )
            }
        </select>
        <Error>{errorWallet}</Error>

        <Label htmlFor="description">Description</Label>
        <textarea id="description" rows={4} className="w-full mt-2 p-2" value={description} onChange={onChangeDescription} />

        <button className="w-full mt-10 bg-emerald-700" onClick={handleSave}>Save</button>

        <Toast
            position="top-center"
            autoClose={1000}
        />
    </div>);
}

export default AddExpense;