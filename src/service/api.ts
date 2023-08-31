
import { init as initFirebase } from './firebase'


export { getExpenses, insertExpense, wipeData } from './api/expense'
export { fetchSubcategories, fetchWallets } from './g-sheets'

export const init = () => {
    initFirebase()
}
