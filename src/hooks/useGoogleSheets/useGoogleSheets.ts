import React from "react"
import * as Api from '../../service/api'



const useGoogleSheets = () => {

    const [subcategories, setSubcategories] = React.useState([])
    const [wallets, setWallets] = React.useState([])

    React.useEffect(() => {

        const loadData = async () => {

            const [subcategoryResult, walletResult] = await Promise.allSettled([
                Api.fetchSubcategories(),
                Api.fetchWallets()
            ])

            if (subcategoryResult.status === 'rejected') {
                const error = subcategoryResult.reason
                console.log(error)
            } else {
                setSubcategories(subcategoryResult.value)
            }

            if (walletResult.status === 'rejected') {
                const error = walletResult.reason
                console.log(error)
            } else {
                setWallets(walletResult.value)
            }
        }

        loadData()
    }, [])

    return { subcategories, wallets }
}

export default useGoogleSheets