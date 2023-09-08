import React from "react";
import { AddExpense, ExpensesList } from "..";


const Home = () => {

    // By default show the add expense page
    const [showList, setShowList] = React.useState(false)


    const content = showList ? <ExpensesList /> : <AddExpense />
    return (<>
        <>
            <button className={showList ? 'bg-green-700' : ''} onClick={() => setShowList(true)}>List</button>
            <button className={!showList ? 'bg-green-700' : ''} onClick={() => setShowList(false)}>New</button>
        </>

        <div className="mt-3">
            {content}
        </div>
    </>)
}

export default Home;