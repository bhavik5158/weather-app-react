import React from 'react'
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import { useSelector, useDispatch } from 'react-redux';
import citySlice from './redux/slice/citySlice';
import Forecast from './components/Forecast';

function App() {

    const dispatch = useDispatch()
    const city = useSelector(state => state.city)

    React.useEffect(() => {
        city.cityName && (
            fetch(`https://geocode.maps.co/search?q=${city.cityName}, ${city.country}`)
                .then((resp) => resp.json())
                .then((resp) => {
                    dispatch(citySlice.actions.setLatLon({ lat: resp[0].lat, lon: resp[0].lon }))
                })
        )
    }, [city])


    return (
        <React.Fragment>
            <div className="container p-5">
                <SearchBar />
                <CurrentWeather />
                <Forecast />
            </div>
        </React.Fragment>
    );
}

export default App;
