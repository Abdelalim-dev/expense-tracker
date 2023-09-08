import { AddExpense, ExpensesList } from "..";


const Home = () => {

    return (<>

        <AddExpense />

        <hr className="mt-2" />

        <ExpensesList />

    </>)
}

export default Home;