import { ExpenseProps } from "../../types/Expense";
import { ComponentProps } from "react";

import bills from "../../assets/icons/icn-bills.svg"
import doc from "../../assets/icons/icn-doc.svg"
import groceries from "../../assets/icons/icn-groceries.svg"
import home from "../../assets/icons/icn-home.svg"
import kids from "../../assets/icons/icn-kids.svg"
import us from "../../assets/icons/icn-us.svg"
import other from "../../assets/icons/icn-exclamation.svg"
const icons: { [key: string]: string } = { bills, doc, groceries, home, kids, us }


type IconProps = { name: string } & ComponentProps<"img">
const Icon = ({ name, ...props }: IconProps) => {
    const icon = icons[name] || other
    return <img src={icon} width={32} alt={`Icon ${name}`} {...props} />
}

const ListItem = ({ item }: { item: ExpenseProps }) => {
    return (<div className="flex bg-white mt-2 py-2 px-4 rounded dark:bg-neutral-800 cursor-pointer">
        <Icon name={item.wallet.toLowerCase()} className="mr-2 text-xs" />
        <div>
            <div className="flex justify-between">
                <span>{item.subcategory}</span>

                <span className="font-bold">{item.amount}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
                <span>{item.description}</span>
                <span>{(new Date(item.date)).toDateString()}</span>
            </div>
        </div>
    </div>);
}

export default ListItem;