import { MouseEvent, PropsWithChildren } from "react";


const Label = ({ htmlFor, children }: PropsWithChildren & { htmlFor: string }) => {
    return <label htmlFor={htmlFor} className="block text-start mt-6 text-sm text-gray-300">{children}</label>
}

const AddExpense = () => {
    function handleExport(): void {
        console.log('Save...')
    }

    return (<div className="min-w-[320px] relative flex flex-col h-full max-h-[80vh]">
        <input className="w-full p-2 rounded" placeholder="Amount" />

        <Label htmlFor="subcategory">Category</Label>
        <select id="subcategory" className="w-full mt-2 p-2 rounded">
            <option value="none">None</option>
            <option value="none2">...</option>
        </select>

        <Label htmlFor="wallet">Wallet</Label>
        <select id="wallet" className="w-full mt-2 p-2 rounded">
            <option value="none">None</option>
            <option value="none2">...</option>
        </select>

        <Label htmlFor="description">Description</Label>
        <textarea id="description" rows={4} className="w-full mt-2 p-2" />

        <button className="w-full mt-10 bg-emerald-700" onClick={handleExport}>Export</button>
    </div>);
}

export default AddExpense;