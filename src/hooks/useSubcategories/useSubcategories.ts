import React from "react"
import * as Api from '../../service/api'



const useSubcategories = () => {

    const [subcategories, setSubcategories] = React.useState([])

    React.useEffect(() => {

        const loadSubcategories = async () => {
            const sub = await Api.loadSubcategories()
            setSubcategories(sub)
        }

        loadSubcategories()
    }, [])

    return subcategories
}

export default useSubcategories