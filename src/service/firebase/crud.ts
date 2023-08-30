import { Unsubscribe, child, getDatabase, onValue, push, ref, remove, update } from "firebase/database";

const PATH_EXPENSES = 'expenses'

/**
 * @param onChange listener for data change 
 * @returns A cleanup function
 */
export const getExpenses = (onChange: (data: any) => void): Unsubscribe => {

    const db = getDatabase();

    const expensesRef = ref(db, PATH_EXPENSES)

    return onValue(expensesRef, (snapshot) => onChange && onChange(snapshot.val()))
}

export const insertExpense = (data: any) => {

    const db = getDatabase();

    const newKey = push(child(ref(db), PATH_EXPENSES)).key;

    const updates: { [key: string]: Object } = {};

    updates[`/${PATH_EXPENSES}/` + newKey] = data;

    return update(ref(db), updates);
}


export function wipeData() {

    const db = getDatabase()

    remove(ref(db, PATH_EXPENSES))
}
