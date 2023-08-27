

const SHEET_TITLE = "Subcategories"
const SHEET_URL = import.meta.env.VITE_SHEET_URL

type SheetsRowProps = {
    c: { v: string }[]
}


export const loadSubcategories = async () => {
    // Can add a range if needed, eg. '&range=E13:F23'
    const rep = await fetch(`${SHEET_URL}?sheet=${SHEET_TITLE}`).then(res => res.text())

    let data = JSON.parse(rep.substring(47).slice(0, -2))

    const filteredRows = data.table.rows
        .filter((_: SheetsRowProps, index: number) => index > 0) // Skip first, just titles
        .map((row: SheetsRowProps) => {
            const [subcategory, _, wallet] = row.c
            return { subcategory: subcategory.v, wallet: wallet.v }
        })

    return filteredRows
}