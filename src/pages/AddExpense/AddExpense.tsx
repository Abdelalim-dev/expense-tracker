import React, { ChangeEvent, MouseEvent, PropsWithChildren } from "react";
import useGoogleSheets from "../../hooks/useGoogleSheets/useGoogleSheets";


const Label = ({ htmlFor, children }: PropsWithChildren & { htmlFor: string }) => {
    return <label htmlFor={htmlFor} className="block text-start mt-6 text-sm text-gray-300">{children}</label>
}

const AddExpense = () => {

    const { subcategories, wallets } = useGoogleSheets()
    const [amount, setAmount] = React.useState(0)
    const [selectedSubcategory, setSelectedSubcategory] = React.useState<undefined | string>(undefined)
    const [selectedWallet, setSelectedWallet] = React.useState<undefined | string>(undefined)
    const [description, setDescription] = React.useState("")

    function handleSave(): void {
        console.log('Save...', amount, selectedSubcategory, selectedWallet, description)
    }

    function onChangeSubcategory(event: ChangeEvent<HTMLSelectElement>): void {

        const [subcategory, wallet] = event.target.value.split('.')

        setSelectedSubcategory(subcategory)

        if (wallet != null) setSelectedWallet(wallet)
    }

    function onChangeWallet(event: ChangeEvent<HTMLSelectElement>): void {

        setSelectedWallet(event.target.value)
    }

    function onChangeAmount(event: ChangeEvent<HTMLInputElement>): void {
        const _amount = event.target.value

        if (isNaN(Number(_amount))) return

        if (Number(_amount) > 9999999999999) return

        setAmount(Number(_amount))
    }

    function onChangeDescription(event: ChangeEvent<HTMLTextAreaElement>): void {
        setDescription(event.target.value)
    }

    if (!subcategories.length) return <>Loading...</>

    return (<div className="min-w-[320px] relative flex flex-col h-full max-h-[80vh]">
        <input className="w-full p-2 rounded" placeholder="Amount" value={amount} onChange={onChangeAmount} />

        <Label htmlFor="subcategory">Category</Label>
        <select id="subcategory" className="w-full mt-2 p-2 rounded"
            onChange={onChangeSubcategory}>
            <option value="none">None</option>
            {
                subcategories.map(({ subcategory, wallet }) =>
                    <option key={subcategory} value={`${subcategory}.${wallet}`}>
                        {subcategory}
                    </option>
                )
            }

        </select>

        <Label htmlFor="wallet">Wallet</Label>
        <select id="wallet" className="w-full mt-2 p-2 rounded"
            value={selectedWallet} onChange={onChangeWallet}>
            <option value="none">None</option>
            {
                wallets.map(({ wallet }) =>
                    <option key={wallet} value={wallet}>
                        {wallet}
                    </option>
                )
            }
        </select>

        <Label htmlFor="description">Description</Label>
        <textarea id="description" rows={4} className="w-full mt-2 p-2" onChange={onChangeDescription} />

        <button className="w-full mt-10 bg-emerald-700" onClick={handleSave}>Export</button>
    </div>);
}

export default AddExpense;