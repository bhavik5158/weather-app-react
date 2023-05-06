import React from 'react'
import { useSelector } from 'react-redux';

function CurrentWeather() {

    const [weatherData, setWeatherData] = React.useState(null)
    const cityData = useSelector(state => state.city)

    React.useEffect(() => {
        cityData.latitude &&
            (
                fetch(`${process.env.REACT_APP_OPENWEATHER_APIURL}/2.5/weather?units=metric&lat=${cityData.latitude}&lon=${cityData.longitude}&appid=${process.env.REACT_APP_OPENWEATHER_APIKEY}`)
                    .then(resp => resp.json())
                    .then((resp) => {
                        // console.log(resp)
                        setWeatherData(resp)
                    }))


    }, [cityData])

    return (
        <>{weatherData &&

            <div className={`mx-auto mt-5 bg-teal-950 rounded-md p-5 pt-1 w-11/12 lg:w-1/4`}>
                <div className={`flex justify-between items-center`}>
                    <div className={`flex-[70%] md:flex-auto`}>
                        <p className={`font-semibold leading-[1px] tracking-wide text-lg text-slate-50`}>{`${cityData.cityName}, ${weatherData.sys.country}`}</p>
                        <p className='font-normal text-sm mt-2 text-slate-50'>{weatherData ? weatherData.weather[0].main : '-'}</p>
                    </div>
                    <div className={`flex-[30%] md:flex-auto`} >
                        <img src={`/icons/${weatherData ? weatherData.weather[0].icon : 'unknown'}.png`} alt="img" />
                    </div>
                </div>
                <div className={`section2 flex justify-between items-center`}>
                    <p className={`font-semibold text-7xl w-auto tracking-[-5px] my-3 mx-0 text-slate-50`}>{weatherData ? parseInt(weatherData.main.temp) : '-'}°C</p>
                    <div className={`w-full p-5`}>
                        <div>
                            <span className={`text-slate-50`}>Details</span>
                        </div>
                        <div className={`flex justify-between text-xs text-slate-50`}>
                            <span>Feels like</span>
                            <span className={`font-semibold`}>{weatherData ? weatherData.main.feels_like : '-'}°C</span>
                        </div>
                        <div className={`flex justify-between text-xs text-slate-50`}>
                            <span>Wind</span>
                            <span className={`font-semibold`}>{weatherData ? weatherData.wind.speed : '-'} m/s</span>
                        </div>
                        <div className={`flex justify-between text-xs text-slate-50`}>
                            <span>Humidity</span>
                            <span className={`font-semibold`}>{weatherData ? weatherData.main.humidity : '-'}%</span>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default CurrentWeather;