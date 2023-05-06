import { createSlice } from "@reduxjs/toolkit";


const citySlice = createSlice({
    name: 'city',
    initialState: {
        cityName: '',
        country: '',
        latitude: '',
        longitude: ''
    },
    reducers: {
        setCity(state, actions){
            state.cityName = actions.payload.city
            state.country = actions.payload.country
        },
        setLatLon(state, actions){
            state.latitude = actions.payload.lat
            state.longitude = actions.payload.lon
        }
    }
})

export default citySlice;