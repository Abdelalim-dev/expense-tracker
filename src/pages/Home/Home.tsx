import React from "react";
import { AddExpense, ExpensesList } from "..";


const Home = () => {

    // By default show the add expense page
    const [showList, setShowList] = React.useState(false)

    
    const content = showList ? <ExpensesList /> : <AddExpense />
    return (<>
        <div>
            <button className={showList ? 'bg-green-700' : ''} onClick={() => setShowList(true)}>Expenses List</button>
            <button className={!showList ? 'bg-green-700' : ''} onClick={() => setShowList(false)}>Add new Expense</button>
        </div>
        {content}
    </>)
}

export default Home;