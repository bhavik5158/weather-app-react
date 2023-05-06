import React from 'react'
import citydata from '../world-cities_json.json'
import styles from './Searchbar.module.css'
import { useDispatch } from 'react-redux'
import citySlice from '../redux/slice/citySlice'

function SearchBar() {

    const [inputField, setInputField] = React.useState('')
    const [cities, setCities] = React.useState([])
    const [selectedCity, setSelectedCity] = React.useState([])

    const dispatch = useDispatch()
    const reduxActions = citySlice.actions

    React.useEffect(() => {
        setCities(citydata.filter((city) => {
            return city.name.toLowerCase().startsWith(inputField)
        }))
        if(inputField == ''){
            setCities([])
        }
    }, [inputField])

    const handleSelect = (city) => {
        setSelectedCity(city)
        setInputField('')
        dispatch(reduxActions.setCity({ city: city.name, country: city.country }))
    }

    return (
        <>
            <div className="container">
                <div className='grid grid-cols-1 justify-center'>
                    <div className='grid justify-center relative'>
                        <div className={`mt-[10px]`}>
                            <input type="text" className={`p-2 w-[300px] rounded-md bg-zinc-600 outline-1 outline-neutral-800 placeholder:text-neutral-300`} placeholder='Enter City Name' value={inputField} onChange={(e) => setInputField((e.target.value).toLowerCase())} />
                        </div>
                        {
                            inputField.length > 0 ?
                                <div className={`${styles.dataResult}`}>
                                    {cities.slice(0, 50).map((city, indx) => (
                                        <div className={`${styles.dataItem} py-1 px-1`} key={indx} onClick={() => handleSelect(city)}><p className="w-[100%]">{`${city.name}, ${city.country}`}</p></div>
                                    ))}
                                </div> : null
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default SearchBar