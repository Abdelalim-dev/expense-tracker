import { ExpenseProps } from "../../types/Expense";


const ListItem = ({ item }: { item: ExpenseProps }) => {
    return (<div className="bg-white mt-2 py-2 px-4 rounded min-w-[320px] dark:bg-neutral-800 cursor-pointer">

        <div className="flex justify-between">
            <span>{item.subcategory}</span>

            {/* Evaluate amount if not a single value */}
            <span className="font-bold">{item.amount}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
            <span>{item.description}</span>
            <span>{(new Date(item.date)).toDateString()}</span>
        </div>
    </div>);
}

export default ListItem;