import React from "react"

const SHEET_TITLE = "Subcategories"
const SHEET_URL = import.meta.env.VITE_SHEET_URL

type SheetsRowProps = {
    c: { v: string }[]
}

const useSubcategories = () => {

    const [subcategories, setSubcategories] = React.useState([])

    React.useEffect(() => {

        // Can add a range if needed, eg. '&range=E13:F23'
        fetch(`${SHEET_URL}?sheet=${SHEET_TITLE}`)
            .then(res => res.text())
            .then(rep => {
                let data = JSON.parse(rep.substring(47).slice(0, -2))

                const filteredRows = data.table.rows
                    .filter((_: SheetsRowProps, index: number) => index > 0) // Skip first, just titles
                    .map((row: SheetsRowProps) => {
                        const [subcategory, _, wallet] = row.c
                        return { subcategory: subcategory.v, wallet: wallet.v }
                    })

                setSubcategories(filteredRows)
            })
    }, [])

    return subcategories
}

export default useSubcategories